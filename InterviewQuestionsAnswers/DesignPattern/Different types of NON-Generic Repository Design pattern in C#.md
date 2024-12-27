Certainly! Let's explore different types of NON-Generic Repository Design Patterns in C#. These patterns are tailored to specific entities, providing a more straightforward approach compared to their generic counterparts.

### 1. **Basic Repository Pattern**
A basic repository for a specific entity like `Customer`:

```csharp
public interface ICustomerRepository
{
    IEnumerable<Customer> GetAll();
    Customer GetById(int id);
    void Add(Customer customer);
    void Update(Customer customer);
    void Delete(int id);
}

public class CustomerRepository : ICustomerRepository
{
    private readonly DbContext _context;

    public CustomerRepository(DbContext context)
    {
        _context = context;
    }

    public IEnumerable<Customer> GetAll()
    {
        return _context.Customers.ToList();
    }

    public Customer GetById(int id)
    {
        return _context.Customers.Find(id);
    }

    public void Add(Customer customer)
    {
        _context.Customers.Add(customer);
    }

    public void Update(Customer customer)
    {
        _context.Entry(customer).State = EntityState.Modified;
    }

    public void Delete(int id)
    {
        var customer = _context.Customers.Find(id);
        if (customer != null)
        {
            _context.Customers.Remove(customer);
        }
    }
}
```

### 2. **Repository with Query Methods**
This pattern includes methods for more complex queries:

```csharp
public interface IOrderRepository
{
    IEnumerable<Order> GetAll();
    Order GetById(int id);
    IEnumerable<Order> GetOrdersByCustomerId(int customerId);
    void Add(Order order);
    void Update(Order order);
    void Delete(int id);
}

public class OrderRepository : IOrderRepository
{
    private readonly DbContext _context;

    public OrderRepository(DbContext context)
    {
        _context = context;
    }

    public IEnumerable<Order> GetAll()
    {
        return _context.Orders.ToList();
    }

    public Order GetById(int id)
    {
        return _context.Orders.Find(id);
    }

    public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
    {
        return _context.Orders.Where(o => o.CustomerId == customerId).ToList();
    }

    public void Add(Order order)
    {
        _context.Orders.Add(order);
    }

    public void Update(Order order)
    {
        _context.Entry(order).State = EntityState.Modified;
    }

    public void Delete(int id)
    {
        var order = _context.Orders.Find(id);
        if (order != null)
        {
            _context.Orders.Remove(order);
        }
    }
}
```

### 3. **Repository with Unit of Work**
Combining repositories into a unit of work to manage transactions:

```csharp
public interface IUnitOfWork : IDisposable
{
    ICustomerRepository Customers { get; }
    IOrderRepository Orders { get; }
    void Save();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _context;
    private ICustomerRepository _customerRepository;
    private IOrderRepository _orderRepository;

    public UnitOfWork(DbContext context)
    {
        _context = context;
    }

    public ICustomerRepository Customers
    {
        get
        {
            if (_customerRepository == null)
            {
                _customerRepository = new CustomerRepository(_context);
            }
            return _customerRepository;
        }
    }

    public IOrderRepository Orders
    {
        get
        {
            if (_orderRepository == null)
            {
                _orderRepository = new OrderRepository(_context);
            }
            return _orderRepository;
        }
    }

    public void Save()
    {
        _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
```

### 4. **Read-Only Repository**
A read-only repository for scenarios where data modification is not required:

```csharp
public interface IReadOnlyProductRepository
{
    IEnumerable<Product> GetAll();
    Product GetById(int id);
}

public class ReadOnlyProductRepository : IReadOnlyProductRepository
{
    private readonly DbContext _context;

    public ReadOnlyProductRepository(DbContext context)
    {
        _context = context;
    }

    public IEnumerable<Product> GetAll()
    {
        return _context.Products.ToList();
    }

    public Product GetById(int id)
    {
        return _context.Products.Find(id);
    }
}
```

Each of these patterns can be adapted to the specific needs of your application, providing various levels of complexity and flexibility.
