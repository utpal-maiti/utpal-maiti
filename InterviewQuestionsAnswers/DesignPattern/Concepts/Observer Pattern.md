### **Observer Pattern Using C#**

The Observer Pattern is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It is useful for implementing distributed event-handling systems. Here’s an example of how you can implement the Observer Pattern in C#:

#### **Scenario**:
Imagine you are developing a stock trading application where multiple components (e.g., trading algorithms, user interfaces) need to be notified whenever stock prices change. The Observer Pattern can be used to keep these components updated.

#### **Step-by-Step Implementation**:

1. **Define the Observer Interface**:
   - Create an interface for observers that will be notified of changes.

```csharp
public interface IObserver
{
    void Update(decimal price);
}
```

2. **Define the Subject Interface**:
   - Create an interface for the subject that maintains a list of observers and notifies them of changes.

```csharp
public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}
```

3. **Implement the Concrete Subject**:
   - Implement the subject that holds a list of observers and notifies them when the state changes.

```csharp
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
```

4. **Implement Concrete Observers**:
   - Implement concrete observers that react to state changes.

```csharp
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

5. **Using the Observer Pattern**:
   - Create the subject and observers, and attach the observers to the subject. Change the subject's state to see how observers are notified.

```csharp
class Program
{
    static void Main(string[] args)
    {
        Stock stock = new Stock();
        IObserver tradingAlgorithm = new TradingAlgorithm();
        IObserver userInterface = new UserInterface();

        stock.Attach(tradingAlgorithm);
        stock.Attach(userInterface);

        stock.Price = 120.50m;
        stock.Price = 130.75m;
    }
}
```

#### **Benefits of the Observer Pattern**:
- **Loose Coupling**: Observers are loosely coupled to the subject, allowing for greater flexibility and reuse.
- **Automatic Updates**: Observers are automatically notified of changes, ensuring they always have the latest state.
- **Scalability**: Easily add or remove observers without modifying the subject.

This implementation demonstrates how the Observer Pattern can be used to keep multiple components updated with changes in stock prices.