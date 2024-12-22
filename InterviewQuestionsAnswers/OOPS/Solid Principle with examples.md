Absolutely! SOLID is an acronym for five design principles that make software design more understandable, flexible, and maintainable. Here’s a breakdown of each principle with examples in C#:

### 1. Single Responsibility Principle (SRP)
A class should have only one reason to change, meaning it should only have one job or responsibility.

```csharp
// Before applying SRP
public class Report
{
    public void GenerateReport()
    {
        // Report generation logic
    }

    public void PrintReport()
    {
        // Report printing logic
    }

    public void SaveReport()
    {
        // Report saving logic
    }
}

// After applying SRP
public class ReportGenerator
{
    public void GenerateReport()
    {
        // Report generation logic
    }
}

public class ReportPrinter
{
    public void PrintReport()
    {
        // Report printing logic
    }
}

public class ReportSaver
{
    public void SaveReport()
    {
        // Report saving logic
    }
}
```

### 2. Open/Closed Principle (OCP)
Software entities should be open for extension but closed for modification.

```csharp
// Before applying OCP
public class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
}

public class AreaCalculator
{
    public double CalculateArea(Rectangle rectangle)
    {
        return rectangle.Width * rectangle.Height;
    }
}

// After applying OCP
public abstract class Shape
{
    public abstract double CalculateArea();
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public override double CalculateArea()
    {
        return Width * Height;
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }

    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class AreaCalculator
{
    public double CalculateArea(Shape shape)
    {
        return shape.CalculateArea();
    }
}
```

### 3. Liskov Substitution Principle (LSP)
Subclasses should be substitutable for their base classes without altering the correctness of the program.

```csharp
// Before applying LSP
public class Bird
{
    public virtual void Fly()
    {
        Console.WriteLine("Flying");
    }
}

public class Penguin : Bird
{
    public override void Fly()
    {
        throw new Exception("Penguins can't fly");
    }
}

// After applying LSP
public abstract class Bird
{
    public abstract void Move();
}

public class Sparrow : Bird
{
    public override void Move()
    {
        Console.WriteLine("Flying");
    }
}

public class Penguin : Bird
{
    public override void Move()
    {
        Console.WriteLine("Swimming");
    }
}
```

### 4. Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they do not use.

```csharp
// Before applying ISP
public interface IWorker
{
    void Work();
    void Eat();
}

// After applying ISP
public interface IWorker
{
    void Work();
}

public interface IEater
{
    void Eat();
}

public class Worker : IWorker, IEater
{
    public void Work()
    {
        // Working logic
    }

    public void Eat()
    {
        // Eating logic
    }
}
```

### 5. Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions.

```csharp
// Before applying DIP
public class LightBulb
{
    public void TurnOn()
    {
        // Turn on logic
    }
}

public class Switch
{
    private LightBulb _lightBulb;

    public Switch()
    {
        _lightBulb = new LightBulb();
    }

    public void Operate()
    {
        _lightBulb.TurnOn();
    }
}

// After applying DIP
public interface ILightBulb
{
    void TurnOn();
}

public class LightBulb : ILightBulb
{
    public void TurnOn()
    {
        // Turn on logic
    }
}

public class Switch
{
    private readonly ILightBulb _lightBulb;

    public Switch(ILightBulb lightBulb)
    {
        _lightBulb = lightBulb;
    }

    public void Operate()
    {
        _lightBulb.TurnOn();
    }
}
```
