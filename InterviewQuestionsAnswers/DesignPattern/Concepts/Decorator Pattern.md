### **Decorator Pattern Using C#**

The Decorator Pattern is a structural design pattern that allows behavior to be added to individual objects, dynamically, without affecting the behavior of other objects from the same class. It provides a flexible alternative to subclassing for extending functionality. Here’s an example of how you can implement the Decorator Pattern in C#:

#### **Scenario**:
Imagine you are building a file I/O system where you want to add different functionalities (e.g., compression, encryption) to file operations dynamically. The Decorator Pattern can be used to add these functionalities without modifying the existing code.

#### **Step-by-Step Implementation**:

1. **Define the Component Interface**:
   - Create an interface that represents the common operations for the components.

```csharp
public abstract class FileComponent
{
    public abstract void Read();
    public abstract void Write(string data);
}
```

2. **Implement the Concrete Component**:
   - Create a concrete class that implements the component interface.

```csharp
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
```

3. **Create the Decorator Base Class**:
   - Create an abstract decorator class that implements the component interface and has a reference to a component object.

```csharp
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
```

4. **Implement Concrete Decorators**:
   - Create concrete decorator classes that extend the functionality of the component.

```csharp
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

5. **Using the Decorator Pattern**:
   - Use the decorators to add functionality to the file operations dynamically.

```csharp
class Program
{
    static void Main(string[] args)
    {
        FileComponent file = new ConcreteFile();
        file.Write("Hello World!");
        file.Read();

        Console.WriteLine();

        FileComponent compressedFile = new CompressedFile(file);
        compressedFile.Write("Hello World!");
        compressedFile.Read();

        Console.WriteLine();

        FileComponent encryptedFile = new EncryptedFile(compressedFile);
        encryptedFile.Write("Hello World!");
        encryptedFile.Read();
    }
}
```

#### **Benefits of the Decorator Pattern**:
- **Extensibility**: New functionalities can be added to objects without altering their structure.
- **Flexibility**: Behavior can be added or removed dynamically.
- **Single Responsibility Principle**: Each class has a specific responsibility, and functionalities are divided among different classes.

This implementation demonstrates how the Decorator Pattern can be used to add functionalities to file operations dynamically without modifying the existing code. 