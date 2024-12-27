Dapper simplifies SQL query handling by providing convenient methods for executing queries and mapping the results to your C# objects. Here’s how you can handle SQL queries easily with Dapper:

### 1. Basic Query Execution
Dapper provides the `Query` and `QueryFirstOrDefault` methods to execute SQL queries and map the results to your C# objects.

**Example**:
```csharp
using System.Data.SqlClient;
using Dapper;

string connectionString = "YourConnectionString";
using (var db = new SqlConnection(connectionString))
{
    string sql = "SELECT * FROM Users";
    var users = db.Query<User>(sql).ToList();

    foreach (var user in users)
    {
        Console.WriteLine($"ID: {user.UserId}, Name: {user.Name}, Age: {user.Age}");
    }
}
```

### 2. Parameterized Queries
Dapper supports parameterized queries to prevent SQL injection and ensure your queries are secure.

**Example**:
```csharp
string sql = "SELECT * FROM Users WHERE UserId = @Id";
var user = db.QueryFirstOrDefault<User>(sql, new { Id = 1 });
```

### 3. Inserting Data
You can use the `Execute` method to insert data into the database.

**Example**:
```csharp
string sql = "INSERT INTO Users (Name, Age) VALUES (@Name, @Age)";
var affectedRows = db.Execute(sql, new { Name = "John Doe", Age = 30 });
Console.WriteLine($"Rows inserted: {affectedRows}");
```

### 4. Updating Data
Updating data is similar to inserting. Use the `Execute` method with an `UPDATE` statement.

**Example**:
```csharp
string sql = "UPDATE Users SET Name = @Name, Age = @Age WHERE UserId = @Id";
var affectedRows = db.Execute(sql, new { Name = "Jane Doe", Age = 25, Id = 1 });
Console.WriteLine($"Rows updated: {affectedRows}");
```

### 5. Deleting Data
Deleting data follows the same pattern. Use the `Execute` method with a `DELETE` statement.

**Example**:
```csharp
string sql = "DELETE FROM Users WHERE UserId = @Id";
var affectedRows = db.Execute(sql, new { Id = 1 });
Console.WriteLine($"Rows deleted: {affectedRows}");
```

### 6. Stored Procedures
Dapper makes it easy to execute stored procedures. Use the `Query` or `Execute` method with the `commandType` parameter set to `CommandType.StoredProcedure`.

**Example**:
```csharp
var user = db.QueryFirstOrDefault<User>("GetUserById", new { Id = 1 }, commandType: CommandType.StoredProcedure);
```

### 7. Handling Multiple Results
Dapper can handle multiple queries and map them to multiple objects using the `QueryMultiple` method.

**Example**:
```csharp
string sql = "SELECT * FROM Users; SELECT * FROM Orders";
using (var multi = db.QueryMultiple(sql))
{
    var users = multi.Read<User>().ToList();
    var orders = multi.Read<Order>().ToList();
}
```

### 8. Transactions
For operations that need to be executed as a single unit, use transactions to ensure data integrity.

**Example**:
```csharp
using (var transaction = db.BeginTransaction())
{
    try
    {
        string sql = "INSERT INTO Users (Name, Age) VALUES (@Name, @Age)";
        db.Execute(sql, new { Name = "John Doe", Age = 30 }, transaction);

        sql = "INSERT INTO Orders (UserId, OrderDate) VALUES (@UserId, @OrderDate)";
        db.Execute(sql, new { UserId = 1, OrderDate = DateTime.Now }, transaction);

        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}
```

### 9. Asynchronous Methods
Leverage Dapper's asynchronous methods to improve application performance and responsiveness.

**Example**:
```csharp
string sql = "SELECT * FROM Users WHERE UserId = @Id";
var user = await db.QueryFirstOrDefaultAsync<User>(sql, new { Id = 1 });
```

### 10. Mapping to Multiple Types
Dapper can map query results to multiple types using multi-mapping.

**Example**:
```csharp
string sql = @"
    SELECT * FROM Orders o
    INNER JOIN Customers c ON o.CustomerId = c.Id
    WHERE o.OrderId = @OrderId";
var order = db.Query<Order, Customer, Order>(
    sql,
    (order, customer) => {
        order.Customer = customer;
        return order;
    },
    new { OrderId = 1 }
).FirstOrDefault();
```

