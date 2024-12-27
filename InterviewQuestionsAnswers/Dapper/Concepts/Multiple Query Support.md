Dapper's ability to handle multiple queries in a single execution can be incredibly useful for reducing database round trips and improving performance. Here's how you can work with multiple queries using Dapper in C#:

### QueryMultiple Method

The `QueryMultiple` method allows you to execute multiple queries in a single command and retrieve the results in a sequence. This is particularly useful when you need to get data from several tables in a single call to the database.

#### Example Scenario:
Let's say you have two tables: `Users` and `Orders`. You want to fetch all users and their corresponding orders in a single database call.

### Setting Up the Models
First, define your models:

```csharp
public class User
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Order
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; }
}
```

### Executing Multiple Queries
Use the `QueryMultiple` method to execute the queries:

```csharp
using System.Data.SqlClient;
using Dapper;

string connectionString = "YourConnectionString";
using (var db = new SqlConnection(connectionString))
{
    string sql = @"
        SELECT * FROM Users;
        SELECT * FROM Orders;";
    
    using (var multi = db.QueryMultiple(sql))
    {
        var users = multi.Read<User>().ToList();
        var orders = multi.Read<Order>().ToList();
    }

    // Example usage of the retrieved data
    foreach (var user in users)
    {
        Console.WriteLine($"UserId: {user.UserId}, Name: {user.Name}");
        var userOrders = orders.Where(o => o.UserId == user.UserId).ToList();
        foreach (var order in userOrders)
        {
            Console.WriteLine($"   OrderId: {order.OrderId}, OrderDate: {order.OrderDate}");
        }
    }
}
```

### Mapping Results to Complex Types
You can map results to more complex types using multi-mapping. Here's an example of mapping orders with their users:

```csharp
public class User
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public List<Order> Orders { get; set; }
}

public class Order
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; }
}

string sql = @"
    SELECT * FROM Users u
    LEFT JOIN Orders o ON u.UserId = o.UserId";

var userDictionary = new Dictionary<int, User>();

db.Query<User, Order, User>(
    sql,
    (user, order) =>
    {
        if (!userDictionary.TryGetValue(user.UserId, out var currentUser))
        {
            currentUser = user;
            currentUser.Orders = new List<Order>();
            userDictionary.Add(currentUser.UserId, currentUser);
        }

        if (order != null)
        {
            currentUser.Orders.Add(order);
        }

        return currentUser;
    },
    splitOn: "OrderId"
).Distinct().ToList();

var usersWithOrders = userDictionary.Values.ToList();
```

### Using Transactions
You can also use transactions with multiple queries to ensure data integrity:

```csharp
using (var transaction = db.BeginTransaction())
{
    try
    {
        string sql = @"
            INSERT INTO Users (Name, Age) VALUES (@Name, @Age);
            SELECT CAST(SCOPE_IDENTITY() as int)";

        int newUserId = db.Query<int>(sql, new { Name = "New User", Age = 22 }, transaction).Single();

        sql = "INSERT INTO Orders (UserId, OrderDate) VALUES (@UserId, @OrderDate)";
        db.Execute(sql, new { UserId = newUserId, OrderDate = DateTime.Now }, transaction);

        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}
```

### Conclusion

Using `QueryMultiple` in Dapper allows you to execute multiple queries in a single call, reducing the overhead of multiple database round trips. This is particularly useful in scenarios where you need to retrieve related data sets. Combining `QueryMultiple` with transactions, parameterized queries, and multi-mapping can help you build efficient and maintainable data access layers in your C# applications.
