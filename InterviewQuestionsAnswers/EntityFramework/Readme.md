## [Entity Framework (EF) Concepts and Labs](https://github.com/utpal-maiti/Entity-Framework-in-Depth-The-Complete-Guide/)

Entity Framework (EF) is an Object-Relational Mapper (ORM) for .NET applications. It allows developers to work with databases using .NET objects, making data access easier. Below are key concepts of Entity Framework in C#:

### 1. **DbContext**

`DbContext` is the primary class used to interact with the database in EF. It acts as a bridge between your C# code and the database. It handles querying, inserting, updating, and deleting data.

#### Key features:

- **DbSet<TEntity>**: Represents a collection of entities in the database.
- **Database Connection**: Manages database connection and transaction handling.
- **Change Tracking**: Tracks changes made to the entities so they can be saved to the database.

#### Example:

```csharp
public class MyDbContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}
```

### 2. **DbSet<TEntity>**

`DbSet<TEntity>` represents a collection of entities in your database and is used to query or perform CRUD (Create, Read, Update, Delete) operations.

#### Example:

```csharp
using (var context = new MyDbContext())
{
    // Query all students
    var students = context.Students.ToList();

    // Add a new student
    context.Students.Add(new Student { Name = "John Doe" });
    context.SaveChanges();
}
```

### 3. **Entities and POCOs**

An **Entity** in EF is a class that maps to a table in the database. **POCO** (Plain Old CLR Object) classes are simple .NET classes that do not inherit from any special base class, but they can be used as entities.

#### Example:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

### 4. **LINQ to Entities**

Entity Framework allows you to use LINQ (Language Integrated Query) to perform queries against the database. It translates LINQ queries into SQL queries that are executed against the database.

#### Example:

```csharp
using (var context = new MyDbContext())
{
    var query = from s in context.Students
                where s.Name.Contains("John")
                select s;
    var students = query.ToList();
}
```

### 5. **Migrations**

EF supports **Migrations**, which allow you to evolve your database schema over time. Migrations track changes made to your models and can apply those changes to the database.

#### Example:

To add a new migration:

```bash
dotnet ef migrations add AddCourseTable
```

To update the database:

```bash
dotnet ef database update
```

### 6. **CRUD Operations**

EF provides methods for performing **CRUD operations** on entities:

- **Create**: `context.Add()`, `context.AddRange()`
- **Read**: `context.Find()`, `context.Single()`, `context.ToList()`
- **Update**: `context.Update()`, `context.Attach()`
- **Delete**: `context.Remove()`, `context.RemoveRange()`

#### Example:

```csharp
// Create
var student = new Student { Name = "Jane Doe" };
context.Students.Add(student);
context.SaveChanges();

// Read
var student = context.Students.Find(1);

// Update
student.Name = "Jane Smith";
context.SaveChanges();

// Delete
context.Students.Remove(student);
context.SaveChanges();
```

### 7. **Eager, Lazy, and Explicit Loading**

EF allows you to load related data in three ways:

- **Eager Loading**: Loads related data along with the main query using `Include()`.
- **Lazy Loading**: Loads related data when accessed (requires virtual navigation properties).
- **Explicit Loading**: Manually loads related data after the initial query.

#### Example of Eager Loading:

```csharp
var studentsWithCourses = context.Students.Include(s => s.Courses).ToList();
```

#### Example of Lazy Loading:

```csharp
public class Student
{
    public virtual ICollection<Course> Courses { get; set; }
}

var student = context.Students.Find(1);
var courses = student.Courses; // This will trigger a lazy load
```

### 8. **Transactions**

EF automatically handles transactions for you during `SaveChanges()`, but you can manage them manually if necessary.

#### Example:

```csharp
using (var transaction = context.Database.BeginTransaction())
{
    try
    {
        context.Add(new Student { Name = "John" });
        context.SaveChanges();
        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
    }
}
```

### 9. **Concurrency Control**

EF provides **optimistic concurrency control** to handle scenarios where multiple users may be modifying the same data at the same time.

#### Example:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; }
}
```

When EF detects a conflict during `SaveChanges()`, it will throw a `DbUpdateConcurrencyException`, allowing you to handle the conflict.

### 10. **Stored Procedures and Raw SQL**

EF supports calling stored procedures or executing raw SQL queries directly.

#### Example of a raw SQL query:

```csharp
var students = context.Students.FromSqlRaw("SELECT * FROM Students WHERE Name = {0}", "John").ToList();
```

#### Example of a stored procedure:

```csharp
var result = context.Students.FromSqlRaw("EXEC GetStudentById @p0", 1).ToList();
```

### 11. **Query Types (EF Core)**

EF Core supports **Query Types** for mapping database views or queries that don�t correspond to entities.

#### Example:

```csharp
public class StudentSummary
{
    public string Name { get; set; }
    public int CourseCount { get; set; }
}

public class MyDbContext : DbContext
{
    public DbSet<StudentSummary> StudentSummaries { get; set; }
}
```

### 12. **Global Query Filters**

Global query filters allow you to define filters that apply to all queries for a given entity. This is useful for things like soft deletes or multi-tenancy.

#### Example:

```csharp
public class MyDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>().HasQueryFilter(s => !s.IsDeleted);
    }
}
```

### Conclusion

Entity Framework simplifies database interactions in C# by providing a set of powerful tools, including object tracking, LINQ queries, migrations, and more. It helps manage database schema and data manipulation while reducing the amount of boilerplate code required for interacting with databases.

Entity Framework (EF) is an Object-Relational Mapping (ORM) framework for .NET applications that provides a way to interact with databases using C#. There are different approaches within Entity Framework that provide flexibility depending on the application�s needs. Below is an overview of the key approaches available in EF, explained in detail:

### 1. **Code First Approach**

- **Description**: In the Code First approach, the database schema is created based on the C# classes (also known as model classes). This approach allows you to define your domain model first, and EF will generate the database schema based on it.
- **Use Case**: This is useful when you prefer to work with your domain classes first, and let EF generate the database from them.
- **How It Works**:

  - You create C# classes representing your entities (e.g., `Person`, `Product`).
  - Use the `DbContext` class to manage these entities.
  - EF can create a database from the classes using migrations.

- **Code Example**:

  ```csharp
  public class Product
  {
      public int Id { get; set; }
      public string Name { get; set; }
      public decimal Price { get; set; }
  }

  public class MyDbContext : DbContext
  {
      public DbSet<Product> Products { get; set; }
  }
  ```

  - You can create migrations using `Add-Migration` and apply them using `Update-Database`.

- **Advantages**:
  - Flexibility to define entities as POCOs (Plain Old CLR Objects).
  - Allows versioning of the database schema using migrations.
  - Good for Domain-Driven Design (DDD).

### 2. **Database First Approach**

- **Description**: In the Database First approach, you start with an existing database and generate the C# classes (model) based on the database schema. EF generates the necessary code to interact with the database automatically.
- **Use Case**: Useful when you have an existing database, and you want to quickly integrate it with your application using EF.
- **How It Works**:

  - You reverse-engineer the database schema into C# classes using the `Scaffold-DbContext` command.
  - These generated classes (also called entity classes) map directly to the tables in the database.

- **Code Example**:

  ```bash
  Scaffold-DbContext "YourConnectionString" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
  ```

  This command generates classes corresponding to the database tables, as well as a `DbContext` class to interact with the database.

- **Advantages**:
  - Works well when you need to integrate an existing database.
  - Allows you to leverage the already established database schema.

### 3. **Model First Approach**

- **Description**: The Model First approach allows you to define your entity classes visually in an EDMX file (Entity Data Model XML). EF then generates the database schema from this model.
- **Use Case**: Suitable when you want to visually design your database schema and let EF generate both the model classes and database.
- **How It Works**:

  - You create an EDMX file in Visual Studio that visually represents the entities, relationships, and database schema.
  - EF will generate the code for the model classes and the database from the visual model.

- **Code Example**:

  - Create an EDMX model in Visual Studio.
  - The classes will be generated automatically and will reflect the database schema.

- **Advantages**:
  - Visual approach to defining your data model.
  - Useful for users who prefer graphical design over writing code.

### 4. **Repository Pattern with Entity Framework**

- **Description**: The Repository Pattern is a design pattern that acts as a middle layer between the application and data access. It provides a collection-like interface for accessing data from the underlying database.
- **Use Case**: Good for abstracting the database interaction logic and providing a more maintainable, testable codebase.
- **How It Works**:

  - You create repository classes that use `DbContext` to interact with the data layer.
  - The repository exposes methods like `Add()`, `GetById()`, `Update()`, etc., to interact with the entities.

- **Code Example**:

  ```csharp
  public interface IProductRepository
  {
      Product GetProductById(int id);
      void AddProduct(Product product);
  }

  public class ProductRepository : IProductRepository
  {
      private readonly MyDbContext _context;
      public ProductRepository(MyDbContext context)
      {
          _context = context;
      }

      public Product GetProductById(int id)
      {
          return _context.Products.Find(id);
      }

      public void AddProduct(Product product)
      {
          _context.Products.Add(product);
          _context.SaveChanges();
      }
  }
  ```

- **Advantages**:
  - Helps separate concerns by isolating data access.
  - Makes code more maintainable and testable (useful for unit testing).

### 5. **Unit of Work Pattern with Entity Framework**

- **Description**: The Unit of Work Pattern is used to manage transactions and ensure that all changes to entities within a given transaction are committed together.
- **Use Case**: Ideal for managing complex transactions where multiple repositories need to work together and commit changes as a single unit.
- **How It Works**:

  - You manage a set of repositories and track changes within a single transaction context.
  - The Unit of Work pattern will commit all the changes in one operation.

- **Code Example**:

  ```csharp
  public class UnitOfWork : IUnitOfWork
  {
      private readonly MyDbContext _context;

      public IProductRepository ProductRepository { get; }
      public IOrderRepository OrderRepository { get; }

      public UnitOfWork(MyDbContext context)
      {
          _context = context;
          ProductRepository = new ProductRepository(_context);
          OrderRepository = new OrderRepository(_context);
      }

      public void Commit()
      {
          _context.SaveChanges();
      }

      public void Dispose()
      {
          _context.Dispose();
      }
  }
  ```

  The `UnitOfWork` class coordinates multiple repositories and ensures that changes to multiple entities are saved as part of a single transaction.

### 6. **Lazy Loading in Entity Framework**

- **Description**: Lazy Loading in EF allows you to load related data only when it is accessed for the first time, which can help improve performance in certain scenarios.
- **Use Case**: Useful when you don't want to load all related data immediately and want to optimize performance by loading it on demand.
- **How It Works**:

  - You define navigation properties in your entities (e.g., one-to-many or many-to-many relationships).
  - EF automatically loads related entities when they are accessed for the first time.

- **Code Example**:

  ```csharp
  public class Product
  {
      public int ProductId { get; set; }
      public string Name { get; set; }
      public virtual Category Category { get; set; } // Navigation property
  }
  ```

  - The related `Category` data will be loaded only when the `Category` property is accessed.

- **Advantages**:
  - Reduces initial load time when related entities are not immediately needed.

### 7. **Eager Loading in Entity Framework**

- **Description**: Eager Loading loads related entities at the same time as the main entity using the `Include()` method.
- **Use Case**: This approach is used when you know you'll need related entities and want to avoid lazy loading by fetching everything in one query.
- **How It Works**:

  - You explicitly include related entities using the `Include()` method in LINQ queries.

- **Code Example**:

  ```csharp
  var products = dbContext.Products.Include(p => p.Category).ToList();
  ```

  This will load the `Category` data along with each `Product` in a single query.

- **Advantages**:
  - Reduces the number of queries when you need related entities immediately.
  - Improves performance compared to lazy loading in certain scenarios.

---

These are the key approaches and patterns in Entity Framework. Each has its use case, and the choice depends on the project requirements, existing database setup, and developer preferences.

### Lazy Loading in Entity Framework

**Lazy Loading** is a pattern where the related data is not loaded from the database until it is accessed. This can be useful in certain scenarios but also has its downsides.

#### Best Practices:

1. **Use when loading an object graph is costly**: Lazy loading can save resources by loading related entities only when necessary.
2. **Use in Desktop Applications**: Desktop applications often benefit from lazy loading as they handle smaller, more manageable loads and have stateful user interactions.
3. **Avoid in Web Applications**: Web applications should avoid lazy loading due to the overhead of multiple database calls which can degrade performance.

#### How to Stop Lazy Loading:

- **Don't mark the property with `virtual`**:

  ```csharp
  public class Project
  {
      public int ProjectId { get; set; }
      public string Name { get; set; }
      public ICollection<WorkItem> WorkItems { get; set; } // Without virtual
  }
  ```

- **Disable Lazy Loading from Configuration**:
  ```csharp
  public class Plutodb_Context : DbContext
  {
      public Plutodb_Context()
      {
          this.Configuration.LazyLoadingEnabled = false;
      }
  }
  ```

### Eager Loading

**Eager Loading** is a pattern where the related data is loaded from the database as part of the initial query. This typically results in a single query with `JOINs`.

#### Best Practices:

1. **Uses JOINs**: Eager loading fetches related data using SQL JOINs, which is efficient for retrieving complete object graphs.
2. **One Round-Trip**: Eager loading makes a single call to the database, reducing the number of round-trips.
3. **Use in Web Applications**: It is best suited for web applications to minimize the number of database calls.

#### Examples:

- **For Single Properties**:

  ```csharp
  var courses = context.Courses.Include(c => c.Author.Address);
  ```

- **For Collection Properties**:

  ```csharp
  var courses = context.Courses.Include(a => a.Tags);
  ```

- **Multiple Levels of Eager Loading**:
  ```csharp
  var courses = context.Courses
                      .Include(c => c.Author.Address)
                      .Include(a => a.Tags.Select(t => t.Moderator))
                      .Include(c => c.Category)
                      .Include(c => c.Cover);
  ```

### Explicit Loading

**Explicit Loading** is a pattern where related data is explicitly loaded from the database at a later time, using separate queries.

#### Best Practices:

1. **Separates Queries**: Explicit loading uses separate queries to load related entities, which can be useful when you don't need all related data upfront.
2. **Multiple Round-Trips**: This approach results in multiple calls to the database, which may be necessary in some scenarios but should be used judiciously to avoid performance issues.

#### Example:

```csharp
// Load a single course
var course = context.Courses.Single(c => c.Id == 1);

// Load related data
context.Entry(course).Collection(c => c.Tags).Load();
context.Entry(course).Reference(c => c.Author).Load();
```

### Conclusion

Understanding when and how to use lazy, eager, and explicit loading in Entity Framework can greatly impact the performance and efficiency of your application. Choosing the right loading strategy depends on the specific requirements and context of your application. Always consider the trade-offs and best practices for each approach to ensure optimal performance.
