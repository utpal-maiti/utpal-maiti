Sure! Let's explore the SOLID principles with real business use cases using C#:

### 1. Single Responsibility Principle (SRP)

**Definition**: A class should have only one reason to change, meaning it should only have one job or responsibility.

**Example**: In an e-commerce platform, consider a class `OrderProcessor` that handles order validation, payment processing, and sending confirmation emails. This class has multiple responsibilities. By applying SRP, you can split it into three classes: `OrderValidator`, `PaymentProcessor`, and `EmailSender`. Each class now has a single responsibility, making the code easier to maintain and test.

```csharp
public class OrderValidator
{
    public bool Validate(Order order)
    {
        // Validation logic
        return true;
    }
}

public class PaymentProcessor
{
    public void ProcessPayment(Order order)
    {
        // Payment processing logic
    }
}

public class EmailSender
{
    public void SendConfirmationEmail(Order order)
    {
        // Email sending logic
    }
}
```

### 2. Open/Closed Principle (OCP)

**Definition**: Software entities should be open for extension but closed for modification.

**Example**: Imagine a shipping system that calculates shipping costs based on different shipping methods. Initially, you might have a single class with a method that uses `if-else` statements to handle different shipping methods. By applying OCP, you can create a base `Shipping` class and extend it with subclasses like `AirShipping`, `GroundShipping`, and `SeaShipping`. This way, you can add new shipping methods without modifying the existing code.

```csharp
public abstract class Shipping
{
    public abstract double CalculateCost(Order order);
}

public class AirShipping : Shipping
{
    public override double CalculateCost(Order order)
    {
        // Air shipping cost calculation
        return 10.0;
    }
}

public class GroundShipping : Shipping
{
    public override double CalculateCost(Order order)
    {
        // Ground shipping cost calculation
        return 5.0;
    }
}

public class SeaShipping : Shipping
{
    public override double CalculateCost(Order order)
    {
        // Sea shipping cost calculation
        return 7.0;
    }
}
```

### 3. Liskov Substitution Principle (LSP)

**Definition**: Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

**Example**: In a financial application, you might have a base class `Account` with subclasses `SavingsAccount` and `CheckingAccount`. If a method expects an `Account` object, it should work correctly with both `SavingsAccount` and `CheckingAccount` objects.

```csharp
public abstract class Account
{
    public abstract void Deposit(double amount);
}

public class SavingsAccount : Account
{
    public override void Deposit(double amount)
    {
        // Deposit logic for savings account
    }
}

public class CheckingAccount : Account
{
    public override void Deposit(double amount)
    {
        // Deposit logic for checking account
    }
}

public class AccountService
{
    public void ProcessDeposit(Account account, double amount)
    {
        account.Deposit(amount);
    }
}
```

### 4. Interface Segregation Principle (ISP)

**Definition**: Clients should not be forced to depend on interfaces they do not use.

**Example**: Consider a document management system with an interface `DocumentOperations` that includes methods like `Print`, `Scan`, and `Fax`. Not all document types need all these operations. By applying ISP, you can split this interface into smaller, more specific interfaces like `Printable`, `Scannable`, and `Faxable`. Classes can then implement only the interfaces relevant to them.

```csharp
public interface IPrintable
{
    void Print();
}

public interface IScannable
{
    void Scan();
}

public interface IFaxable
{
    void Fax();
}

public class Document : IPrintable, IScannable
{
    public void Print()
    {
        // Print logic
    }

    public void Scan()
    {
        // Scan logic
    }
}
```

### 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

**Example**: In a customer relationship management (CRM) system, a `CustomerService` class might depend on a `CustomerRepository` class for data access. Instead of directly depending on `CustomerRepository`, `CustomerService` should depend on an interface `ICustomerRepository`. This allows you to switch implementations (e.g., from a SQL database to a NoSQL database) without changing the `CustomerService` class.

```csharp
public interface ICustomerRepository
{
    void AddCustomer(Customer customer);
}

public class CustomerRepository : ICustomerRepository
{
    public void AddCustomer(Customer customer)
    {
        // Add customer to database
    }
}

public class CustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public void RegisterCustomer(Customer customer)
    {
        _customerRepository.AddCustomer(customer);
    }
}
```

These examples illustrate how the SOLID principles can be applied in real-world business scenarios using C#. They help in creating flexible and maintainable code, making it easier to adapt to changing requirements and reducing the risk of introducing bugs when making changes.
