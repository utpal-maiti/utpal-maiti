Sure! Object-Oriented Programming (OOP) is a core concept in C# that helps in building modular and reusable software. The four main principles of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction. Let's go through each concept with examples in C#:

### Encapsulation
Encapsulation is the concept of wrapping data (variables) and methods (functions) together as a single unit. In C#, encapsulation can be achieved using access modifiers.

```csharp
public class Person
{
    private string name;
    private int age;

    public void SetName(string name)
    {
        this.name = name;
    }

    public string GetName()
    {
        return name;
    }

    public void SetAge(int age)
    {
        this.age = age;
    }

    public int GetAge()
    {
        return age;
    }
}
```

### Inheritance
Inheritance is the process by which one class inherits the fields and methods of another class. In C#, inheritance is achieved using the `:` symbol.

```csharp
public class Animal
{
    public void Eat()
    {
        Console.WriteLine("Eating...");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Barking...");
    }
}
```

### Polymorphism
Polymorphism allows methods to do different things based on the object it is acting upon. Polymorphism can be achieved through method overriding and overloading in C#.

#### Method Overriding
```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Bark");
    }
}
```

#### Method Overloading
```csharp
public class MathOperations
{
    public int Add(int a, int b)
    {
        return a + b;
    }

    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }
}
```

### Abstraction
Abstraction is the concept of hiding the complex implementation details and showing only the essential features of an object. Abstract classes and interfaces are used to achieve abstraction in C#.

#### Abstract Class
```csharp
public abstract class Shape
{
    public abstract void Draw();
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing Circle");
    }
}
```

#### Interface
```csharp
public interface IAnimal
{
    void Speak();
}

public class Dog : IAnimal
{
    public void Speak()
    {
        Console.WriteLine("Bark");
    }
}
```

