Performing bulk data inserts efficiently is a common requirement in many applications. Dapper, being a lightweight ORM, offers ways to insert large datasets efficiently, but it doesn’t provide built-in support for true bulk operations out of the box. However, you can achieve efficient bulk inserts by leveraging techniques such as batching and using SQL's `INSERT` statement with multiple rows. Here’s a detailed guide on how to perform bulk data inserts using Dapper in C#:

### 1. Using Multiple `INSERT` Statements in a Single Batch
One way to perform bulk inserts is to execute multiple `INSERT` statements in a single batch to reduce the number of round trips to the database.

#### Example:
```csharp
using System.Data.SqlClient;
using Dapper;

string connectionString = "YourConnectionString";
using (var db = new SqlConnection(connectionString))
{
    var users = new List<User>
    {
        new User { Name = "Alice", Age = 25 },
        new User { Name = "Bob", Age = 30 },
        new User { Name = "Charlie", Age = 35 }
    };

    string sql = "INSERT INTO Users (Name, Age) VALUES (@Name, @Age)";
    db.Execute(sql, users);
}
```
In this example, Dapper efficiently handles the list of users and executes multiple `INSERT` statements in a single batch.

### 2. Using a Transaction
For better performance and to ensure data integrity, you can perform bulk inserts within a transaction.

#### Example:
```csharp
using (var db = new SqlConnection(connectionString))
{
    db.Open();
    using (var transaction = db.BeginTransaction())
    {
        try
        {
            var users = new List<User>
            {
                new User { Name = "Alice", Age = 25 },
                new User { Name = "Bob", Age = 30 },
                new User { Name = "Charlie", Age = 35 }
            };

            string sql = "INSERT INTO Users (Name, Age) VALUES (@Name, @Age)";
            db.Execute(sql, users, transaction);

            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}
```
Using transactions ensures that either all the rows are inserted successfully or none, maintaining data consistency.

### 3. Using Table-Valued Parameters (TVPs)
SQL Server's Table-Valued Parameters (TVPs) provide an efficient way to perform bulk inserts. This approach requires defining a user-defined table type and a stored procedure to accept the TVP.

#### Step-by-Step Guide:

1. **Define a User-Defined Table Type:**
    ```sql
    CREATE TYPE UserTableType AS TABLE 
    (
        Name NVARCHAR(100),
        Age INT
    )
    ```

2. **Create a Stored Procedure to Accept TVP:**
    ```sql
    CREATE PROCEDURE BulkInsertUsers
    @UserTable UserTableType READONLY
    AS
    BEGIN
        INSERT INTO Users (Name, Age)
        SELECT Name, Age FROM @UserTable
    END
    ```

3. **Use Dapper to Call the Stored Procedure with TVP:**
    ```csharp
    using System.Data;
    using System.Data.SqlClient;
    using Dapper;

    string connectionString = "YourConnectionString";
    using (var db = new SqlConnection(connectionString))
    {
        var users = new List<User>
        {
            new User { Name = "Alice", Age = 25 },
            new User { Name = "Bob", Age = 30 },
            new User { Name = "Charlie", Age = 35 }
        };

        var userTable = new DataTable();
        userTable.Columns.Add("Name", typeof(string));
        userTable.Columns.Add("Age", typeof(int));

        foreach (var user in users)
        {
            userTable.Rows.Add(user.Name, user.Age);
        }

        var parameters = new DynamicParameters();
        parameters.Add("@UserTable", userTable.AsTableValuedParameter("UserTableType"));

        db.Execute("BulkInsertUsers", parameters, commandType: CommandType.StoredProcedure);
    }
    ```

In this approach, the data is sent to the SQL Server in a single round trip, which is highly efficient for bulk inserts.

### 4. Using SqlBulkCopy
For extremely large datasets, you can use `SqlBulkCopy` provided by ADO.NET, which allows for very fast bulk data loading into SQL Server.

#### Example:
```csharp
using System.Data;
using System.Data.SqlClient;

string connectionString = "YourConnectionString";
using (var db = new SqlConnection(connectionString))
{
    db.Open();

    var users = new List<User>
    {
        new User { Name = "Alice", Age = 25 },
        new User { Name = "Bob", Age = 30 },
        new User { Name = "Charlie", Age = 35 }
    };

    var userTable = new DataTable();
    userTable.Columns.Add("Name", typeof(string));
    userTable.Columns.Add("Age", typeof(int));

    foreach (var user in users)
    {
        userTable.Rows.Add(user.Name, user.Age);
    }

    using (var bulkCopy = new SqlBulkCopy(db))
    {
        bulkCopy.DestinationTableName = "Users";
        bulkCopy.WriteToServer(userTable);
    }
}
```
`SqlBulkCopy` is ideal for very large datasets as it uses SQL Server's bulk copy capabilities, which are optimized for performance.

### Conclusion

Dapper, while lightweight, provides the flexibility to handle bulk data inserts efficiently by leveraging techniques like batching, transactions, table-valued parameters, and `SqlBulkCopy`. These methods ensure that you can perform bulk operations with high performance and maintain data integrity.
