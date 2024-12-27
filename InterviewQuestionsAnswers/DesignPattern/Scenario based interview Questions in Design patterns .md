Sure! Here are some scenario-based interview questions related to design patterns. These questions are designed to evaluate a candidate's understanding of design patterns and their ability to apply them in real-world scenarios.

### **Scenario-Based Interview Questions for Design Patterns**

#### **1. Implementing a Singleton Pattern**

**Scenario**: You need to ensure that a database connection class is instantiated only once and can be accessed globally within an application. How would you implement the Singleton pattern in this case?

**Key Points to Cover**:
- **Thread Safety**: Ensure that the Singleton instance is thread-safe.
- **Lazy Initialization**: Use lazy initialization to create the instance when it is first needed.
- **Global Access**: Provide a global point of access to the instance.

**Example**:
```csharp
public class DatabaseConnection
{
    private static readonly Lazy<DatabaseConnection> _instance =
        new Lazy<DatabaseConnection>(() => new DatabaseConnection());

    private DatabaseConnection() { }

    public static DatabaseConnection Instance => _instance.Value;
}
```

#### **2. Using the Factory Method Pattern**

**Scenario**: Your application needs to generate various types of notifications (e.g., Email, SMS, Push) based on user preferences. How would you use the Factory Method pattern to create these notifications?

**Key Points to Cover**:
- **Abstract Factory Method**: Define an abstract factory method to create different types of notifications.
- **Concrete Implementations**: Implement concrete classes for each notification type.
- **Client Interaction**: The client interacts with the factory to get the appropriate notification object.

**Example**:
```csharp
public interface INotification
{
    void Send(string message);
}

public class EmailNotification : INotification
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending Email: {message}");
    }
}

public class SMSNotification : INotification
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending SMS: {message}");
    }
}

public abstract class NotificationFactory
{
    public abstract INotification CreateNotification();
}

public class EmailNotificationFactory : NotificationFactory
{
    public override INotification CreateNotification()
    {
        return new EmailNotification();
    }
}

public class SMSNotificationFactory : NotificationFactory
{
    public override INotification CreateNotification()
    {
        return new SMSNotification();
    }
}
```

#### **3. Applying the Observer Pattern**

**Scenario**: You are developing a stock trading application where multiple components (e.g., trading algorithms, user interfaces) need to be notified whenever stock prices change. How would you use the Observer pattern to achieve this?

**Key Points to Cover**:
- **Subject Interface**: Define an interface for adding, removing, and notifying observers.
- **Concrete Subject**: Implement the subject that maintains the list of observers.
- **Observer Interface**: Define an interface for observers to update themselves.
- **Concrete Observers**: Implement concrete observers that react to changes.

**Example**:
```csharp
public interface IObserver
{
    void Update(decimal price);
}

public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

public class Stock : ISubject
{
    private readonly List<IObserver> _observers = new();
    private decimal _price;

    public decimal Price
    {
        get => _price;
        set
        {
            _price = value;
            Notify();
        }
    }

    public void Attach(IObserver observer)
    {
        _observers.Add(observer);
    }

    public void Detach(IObserver observer)
    {
        _observers.Remove(observer);
    }

    public void Notify()
    {
        foreach (var observer in _observers)
        {
            observer.Update(_price);
        }
    }
}

public class TradingAlgorithm : IObserver
{
    public void Update(decimal price)
    {
        Console.WriteLine($"Trading Algorithm received price update: {price}");
    }
}

public class UserInterface : IObserver
{
    public void Update(decimal price)
    {
        Console.WriteLine($"User Interface received price update: {price}");
    }
}
```

#### **4. Utilizing the Decorator Pattern**

**Scenario**: You are building a file I/O system where different functionalities (e.g., compression, encryption) can be added to files dynamically. How would you use the Decorator pattern to achieve this?

**Key Points to Cover**:
- **Component Interface**: Define a common interface for all components.
- **Concrete Component**: Implement the core functionality.
- **Decorator Class**: Create a base decorator class that implements the component interface and contains a reference to a component object.
- **Concrete Decorators**: Implement concrete decorators that add specific functionalities.

**Example**:
```csharp
public abstract class FileComponent
{
    public abstract void Read();
    public abstract void Write(string data);
}

public class ConcreteFile : FileComponent
{
    public override void Read()
    {
        Console.WriteLine("Reading file");
    }

    public override void Write(string data)
    {
        Console.WriteLine($"Writing data: {data}");
    }
}

public abstract class FileDecorator : FileComponent
{
    protected FileComponent _fileComponent;

    protected FileDecorator(FileComponent fileComponent)
    {
        _fileComponent = fileComponent;
    }

    public override void Read()
    {
        _fileComponent.Read();
    }

    public override void Write(string data)
    {
        _fileComponent.Write(data);
    }
}

public class CompressedFile : FileDecorator
{
    public CompressedFile(FileComponent fileComponent) : base(fileComponent) { }

    public override void Read()
    {
        Console.WriteLine("Decompressing file");
        base.Read();
    }

    public override void Write(string data)
    {
        Console.WriteLine("Compressing data");
        base.Write(data);
    }
}

public class EncryptedFile : FileDecorator
{
    public EncryptedFile(FileComponent fileComponent) : base(fileComponent) { }

    public override void Read()
    {
        Console.WriteLine("Decrypting file");
        base.Read();
    }

    public override void Write(string data)
    {
        Console.WriteLine("Encrypting data");
        base.Write(data);
    }
}
```

#### **5. Implementing the Strategy Pattern**

**Scenario**: You are developing a payment processing system that supports multiple payment methods (e.g., credit card, PayPal, cryptocurrency). How would you use the Strategy pattern to handle different payment methods?

**Key Points to Cover**:
- **Strategy Interface**: Define a common interface for all payment strategies.
- **Concrete Strategies**: Implement concrete classes for each payment method.
- **Context Class**: Create a context class that uses a strategy object to execute the payment.

**Example**:
```csharp
public interface IPaymentStrategy
{
    void Pay(decimal amount);
}

public class CreditCardPayment : IPaymentStrategy
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paying {amount} using Credit Card");
    }
}

public class PayPalPayment : IPaymentStrategy
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paying {amount} using PayPal");
    }
}

public class CryptocurrencyPayment : IPaymentStrategy
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paying {amount} using Cryptocurrency");
    }
}

public class PaymentContext
{
    private IPaymentStrategy _paymentStrategy;

    public void SetPaymentStrategy(IPaymentStrategy paymentStrategy)
    {
        _paymentStrategy = paymentStrategy;
    }

    public void ExecutePayment(decimal amount)
    {
        _paymentStrategy.Pay(amount);
    }
}
```

These scenario-based questions can help interviewers assess a candidate’s understanding of design patterns and their ability to apply them effectively in real-world situations. They also allow for discussions about design decisions and trade-offs.
