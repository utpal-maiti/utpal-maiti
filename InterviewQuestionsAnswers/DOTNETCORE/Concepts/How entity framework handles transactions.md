Entity Framework (EF) handles transactions to ensure that a series of operations either all succeed or all fail, thus maintaining data integrity. Here's how EF manages transactions:

### Automatic Transactions
Entity Framework automatically wraps the `SaveChanges` method in a transaction. This means when you call `SaveChanges`, EF ensures that all changes are saved successfully. If any operation fails, the entire transaction is rolled back.

### Example:
```csharp
using (var context = new MyDbContext())
{
    // Perform multiple operations
    var customer = new Customer { Name = "John Doe" };
    context.Customers.Add(customer);

    var order = new Order { OrderDate = DateTime.Now };
    context.Orders.Add(order);

    context.SaveChanges(); // All operations are committed in a single transaction
}
```

### Explicit Transactions
Sometimes you might want to control transactions explicitly, especially when you need finer control over the transaction scope or if multiple `SaveChanges` calls are needed within a single transaction.

### Example Using `BeginTransaction`:
```csharp
using (var context = new MyDbContext())
{
    using (var transaction = context.Database.BeginTransaction())
    {
        try
        {
            var customer = new Customer { Name = "Jane Doe" };
            context.Customers.Add(customer);
            context.SaveChanges();

            var order = new Order { OrderDate = DateTime.Now };
            context.Orders.Add(order);
            context.SaveChanges();

            transaction.Commit(); // Commit the transaction if all operations succeed
        }
        catch (Exception)
        {
            transaction.Rollback(); // Roll back the transaction if any operation fails
            throw;
        }
    }
}
```

### Using the `TransactionScope`:
You can also use the `TransactionScope` class for transactions that span multiple contexts or external systems.

### Example Using `TransactionScope`:
```csharp
using System.Transactions;

using (var scope = new TransactionScope())
{
    using (var context1 = new MyDbContext())
    {
        var customer = new Customer { Name = "Tom Smith" };
        context1.Customers.Add(customer);
        context1.SaveChanges();
    }

    using (var context2 = new AnotherDbContext())
    {
        var order = new Order { OrderDate = DateTime.Now };
        context2.Orders.Add(order);
        context2.SaveChanges();
    }

    scope.Complete(); // Complete the transaction if all operations succeed
}
```

### Key Points:
- **Automatic Transactions**: `SaveChanges` wraps all changes in a transaction automatically.
- **Explicit Transactions**: Use `BeginTransaction` for finer control over transaction scope.
- **TransactionScope**: Use `TransactionScope` for transactions that span multiple contexts or external systems.

These mechanisms ensure that your data operations are atomic, consistent, isolated, and durable (ACID). Properly handling transactions is essential for maintaining data integrity and consistency in your application.
