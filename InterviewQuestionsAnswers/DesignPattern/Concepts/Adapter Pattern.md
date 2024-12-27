### **Adapter Pattern Using C#**

The Adapter Pattern is a structural design pattern that allows objects with incompatible interfaces to work together. The adapter acts as a bridge between the two interfaces, enabling the client to use the services of the adaptee. Here’s an example of how you can implement the Adapter Pattern in C#:

#### **Scenario**:
Imagine you are developing an application that needs to integrate with an external library for logging. The external library has a different interface from the one used in your application. You can use the Adapter Pattern to make these interfaces compatible.

#### **Step-by-Step Implementation**:

1. **Define the Target Interface**:
   - Create an interface that represents the desired interface your application will use.

```csharp
public interface ILogger
{
    void Log(string message);
}
```

2. **Implement the Adaptee**:
   - Implement the existing class or interface that needs to be adapted.

```csharp
public class ExternalLogger
{
    public void WriteLog(string logMessage)
    {
        Console.WriteLine($"External Logger: {logMessage}");
    }
}
```

3. **Create the Adapter Class**:
   - Implement the target interface and hold a reference to an instance of the adaptee. Convert calls to the target interface into calls to the adaptee interface.

```csharp
public class LoggerAdapter : ILogger
{
    private readonly ExternalLogger _externalLogger;

    public LoggerAdapter(ExternalLogger externalLogger)
    {
        _externalLogger = externalLogger;
    }

    public void Log(string message)
    {
        _externalLogger.WriteLog(message);
    }
}
```

4. **Use the Adapter in Client Code**:
   - Use the adapter to interact with the external library through the target interface.

```csharp
class Program
{
    static void Main(string[] args)
    {
        ExternalLogger externalLogger = new ExternalLogger();
        ILogger logger = new LoggerAdapter(externalLogger);

        logger.Log("This is a log message");
    }
}
```

#### **Benefits of the Adapter Pattern**:
- **Compatibility**: Allows incompatible interfaces to work together.
- **Reusability**: Enables reuse of existing classes without modifying their code.
- **Flexibility**: Can adapt multiple incompatible classes to work with the target interface.

This implementation demonstrates how the Adapter Pattern can be used to integrate an external library with a different interface into an existing application.