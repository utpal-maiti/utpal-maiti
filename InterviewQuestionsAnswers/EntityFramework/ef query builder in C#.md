Entity Framework (EF) in C# provides a powerful way to interact with databases using LINQ (Language Integrated Query). The Query Builder pattern in EF allows you to build dynamic and complex queries programmatically. Here's an in-depth look at how to use the EF Query Builder in C#:

### Basic Concepts

#### 1. **DbContext**

- **Definition**: DbContext is the primary class responsible for interacting with the database. It encapsulates the database connection and provides methods for querying and saving data.
- **Usage**: You create a DbContext class that inherits from `DbContext` and defines `DbSet<T>` properties for each entity type.

#### 2. **DbSet<T>**

- **Definition**: DbSet represents a collection of entities of a specific type. It is used to perform CRUD operations.
- **Usage**: You use DbSet to query and interact with the data in the database.

### Building Queries

#### 1. **Basic Query**

```csharp
using (var context = new MyDbContext())
{
    var students = context.Students.ToList();
}
```

#### 2. **Filtering Data**

```csharp
using (var context = new MyDbContext())
{
    var students = context.Students.Where(s => s.LastName == "Smith").ToList();
}
```

#### 3. **Sorting Data**

```csharp
using (var context = new MyDbContext())
{
    var students = context.Students.OrderBy(s => s.LastName).ToList();
}
```

#### 4. **Selecting Specific Columns**

```csharp
using (var context = new MyDbContext())
{
    var studentNames = context.Students.Select(s => s.FirstName).ToList();
}
```

#### 5. **Joining Tables**

```csharp
using (var context = new MyDbContext())
{
    var studentCourses = from student in context.Students
                         join enrollment in context.Enrollments
                         on student.StudentId equals enrollment.StudentId
                         join course in context.Courses
                         on enrollment.CourseId equals course.CourseId
                         select new
                         {
                             StudentName = student.FirstName + " " + student.LastName,
                             CourseName = course.CourseName
                         };

    var result = studentCourses.ToList();
}
```

### Advanced Query Building

#### 1. **Dynamic Query Building**

```csharp
using System.Linq.Expressions;

public static IQueryable<T> BuildQuery<T>(this IQueryable<T> source, string propertyName, string value)
{
    var parameter = Expression.Parameter(typeof(T), "x");
    var property = Expression.Property(parameter, propertyName);
    var constant = Expression.Constant(value);
    var equal = Expression.Equal(property, constant);

    var lambda = Expression.Lambda<Func<T, bool>>(equal, parameter);
    return source.Where(lambda);
}

// Usage
using (var context = new MyDbContext())
{
    var query = context.Students.BuildQuery("LastName", "Smith");
    var students = query.ToList();
}
```

#### 2. **Complex Queries**

```csharp
using (var context = new MyDbContext())
{
    var query = context.Students
        .Where(s => s.LastName == "Smith")
        .OrderBy(s => s.FirstName)
        .Select(s => new
        {
            s.StudentId,
            s.FirstName,
            s.LastName,
            s.Enrollments
                .Where(e => e.Grade >= 90)
                .Select(e => new { e.Course.CourseName, e.Grade })
        });

    var result = query.ToList();
}
```

### Executing Raw SQL Queries

If you need to execute raw SQL queries, EF Core provides methods to do so.

#### 1. **FromSqlRaw**

```csharp
using (var context = new MyDbContext())
{
    var students = context.Students
        .FromSqlRaw("SELECT * FROM Students WHERE LastName = {0}", "Smith")
        .ToList();
}
```

### Conclusion

The EF Query Builder in C# offers a powerful and flexible way to build and execute dynamic and complex queries. Whether you're performing simple CRUD operations or building advanced queries, Entity Framework simplifies database interactions while providing a rich set of features for querying and manipulating data.
