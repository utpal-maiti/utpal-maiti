Absolutely, let's explore an example in C# that demonstrates the Liskov Substitution Principle (LSP):

Imagine you have a base class called `Bird` with a method `Fly`. You also have a derived class called `Penguin` which is a bird but cannot fly.

### Without LSP:
```csharp
public class Bird
{
    public virtual void Fly()
    {
        Console.WriteLine("Bird is flying");
    }
}

public class Penguin : Bird
{
    public override void Fly()
    {
        throw new NotImplementedException();
    }
}

public class BirdWatcher
{
    public void WatchBirdsFly(Bird bird)
    {
        bird.Fly();
    }
}

class Program
{
    static void Main()
    {
        BirdWatcher watcher = new BirdWatcher();
        Bird sparrow = new Bird();
        Bird penguin = new Penguin();
        
        watcher.WatchBirdsFly(sparrow); // Works fine
        watcher.WatchBirdsFly(penguin); // Throws exception at runtime
    }
}
```

In this case, substituting a `Penguin` object for a `Bird` object violates the Liskov Substitution Principle because `Penguin` cannot fly, leading to an exception.

### With LSP:
To fix this, we should refactor our design to follow LSP. We can introduce an interface called `IFlyable` that only includes birds that can fly.

```csharp
public interface IFlyable
{
    void Fly();
}

public class Bird
{
}

public class Sparrow : Bird, IFlyable
{
    public void Fly()
    {
        Console.WriteLine("Sparrow is flying");
    }
}

public class Penguin : Bird
{
    // Penguins do not implement IFlyable
}

public class BirdWatcher
{
    public void WatchBirdsFly(IFlyable bird)
    {
        bird.Fly();
    }
}

class Program
{
    static void Main()
    {
        BirdWatcher watcher = new BirdWatcher();
        Sparrow sparrow = new Sparrow();
        
        watcher.WatchBirdsFly(sparrow); // Works fine
        
        // watcher.WatchBirdsFly(new Penguin()); // Compile-time error, not runtime exception
    }
}
```

Here, the `Penguin` class does not implement the `IFlyable` interface, so it cannot be used in the `WatchBirdsFly` method. This ensures that the Liskov Substitution Principle is upheld, as any object passed to `WatchBirdsFly` is guaranteed to be able to fly, avoiding runtime exceptions.

