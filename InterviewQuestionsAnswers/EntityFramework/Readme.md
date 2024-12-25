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
EF Core supports **Query Types** for mapping database views or queries that don’t correspond to entities.

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