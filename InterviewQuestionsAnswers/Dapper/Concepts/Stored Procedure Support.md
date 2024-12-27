Dapper provides excellent support for executing stored procedures in SQL Server and other relational databases. Using stored procedures can help encapsulate complex SQL logic and improve performance by reducing the amount of SQL code sent over the network. Here's a detailed look at how to work with stored procedures using Dapper in C#:

### 1. Defining a Stored Procedure
First, create a stored procedure in your database. Here's an example of a stored procedure that retrieves a user by their ID:

```sql
CREATE PROCEDURE GetUserById
    @UserId INT
AS
BEGIN
    SELECT UserId, Name, Age FROM Users WHERE UserId = @UserId
END
```

### 2. Executing a Stored Procedure
You can execute stored procedures using the `Query` and `Execute` methods in Dapper. The key is to set the `commandType` parameter to `CommandType.StoredProcedure`.

#### Example: Querying Data
To call the `GetUserById` stored procedure and map the results to a `User` object, you can do the following:

```csharp
using System.Data;
using System.Data.SqlClient;
using Dapper;

public class User
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}

string connectionString = "YourConnectionString";
using (var db = new SqlConnection(connectionString))
{
    var user = db.QueryFirstOrDefault<User>(
        "GetUserById", 
        new { UserId = 1 }, 
        commandType: CommandType.StoredProcedure
    );

    Console.WriteLine($"ID: {user.UserId}, Name: {user.Name}, Age: {user.Age}");
}
```

#### Example: Executing Non-Query Stored Procedures
If you have a stored procedure that performs an action (e.g., inserts, updates, or deletes data) but does not return results, use the `Execute` method:

```sql
CREATE PROCEDURE AddUser
    @Name NVARCHAR(100),
    @Age INT
AS
BEGIN
    INSERT INTO Users (Name, Age) VALUES (@Name, @Age)
END
```

```csharp
string sql = "AddUser";
var affectedRows = db.Execute(
    sql, 
    new { Name = "John Doe", Age = 30 }, 
    commandType: CommandType.StoredProcedure
);

Console.WriteLine($"Rows affected: {affectedRows}");
```

### 3. Handling Output Parameters
Stored procedures can also return output parameters. Here's how to handle them with Dapper:

#### Example: Stored Procedure with Output Parameter
Create a stored procedure that returns an output parameter:

```sql
CREATE PROCEDURE AddUserWithOutput
    @Name NVARCHAR(100),
    @Age INT,
    @NewUserId INT OUTPUT
AS
BEGIN
    INSERT INTO Users (Name, Age) VALUES (@Name, @Age)
    SET @NewUserId = SCOPE_IDENTITY()
END
```

Call the stored procedure and retrieve the output parameter in C#:

```csharp
var parameters = new DynamicParameters();
parameters.Add("Name", "Jane Doe");
parameters.Add("Age", 25);
parameters.Add("NewUserId", dbType: DbType.Int32, direction: ParameterDirection.Output);

db.Execute("AddUserWithOutput", parameters, commandType: CommandType.StoredProcedure);

int newUserId = parameters.Get<int>("NewUserId");
Console.WriteLine($"New User ID: {newUserId}");
```

### 4. Handling Return Values
Stored procedures can also return values. Here’s how to handle them with Dapper:

#### Example: Stored Procedure with Return Value
Create a stored procedure that returns a value:

```sql
CREATE PROCEDURE GetAge
    @UserId INT
RETURNS INT
AS
BEGIN
    DECLARE @Age INT
    SELECT @Age = Age FROM Users WHERE UserId = @UserId
    RETURN @Age
END
```

Call the stored procedure and retrieve the return value in C#:

```csharp
var parameters = new DynamicParameters();
parameters.Add("UserId", 1);
parameters.Add("ReturnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

db.Execute("GetAge", parameters, commandType: CommandType.StoredProcedure);

int age = parameters.Get<int>("ReturnValue");
Console.WriteLine($"User Age: {age}");
```

### 5. Multiple Result Sets
Dapper can also handle multiple result sets returned by a stored procedure. Here's how to do it:

#### Example: Stored Procedure with Multiple Result Sets
Create a stored procedure that returns multiple result sets:

```sql
CREATE PROCEDURE GetUserAndOrders
    @UserId INT
AS
BEGIN
    SELECT * FROM Users WHERE UserId = @UserId
    SELECT * FROM Orders WHERE UserId = @UserId
END
```

Call the stored procedure and handle the multiple result sets in C#:

```csharp
using (var multi = db.QueryMultiple("GetUserAndOrders", new { UserId = 1 }, commandType: CommandType.StoredProcedure))
{
    var user = multi.Read<User>().FirstOrDefault();
    var orders = multi.Read<Order>().ToList();
}

// Example usage of the retrieved data
if (user != null)
{
    Console.WriteLine($"User: {user.Name}");
    foreach (var order in orders)
    {
        Console.WriteLine($"Order ID: {order.OrderId}, Date: {order.OrderDate}");
    }
}
```

### Conclusion

Dapper provides robust support for stored procedures, allowing you to execute complex SQL logic and handle output parameters, return values, and multiple result sets efficiently. By leveraging stored procedures, you can encapsulate your business logic within the database, improve performance, and maintain cleaner application code.
