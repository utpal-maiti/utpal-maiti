Reflection in .NET Core is a powerful feature that allows you to inspect and interact with metadata about types, methods, properties, and other members in your application at runtime. This can be incredibly useful for scenarios like dynamic type creation, method invocation, or accessing attributes.

Here's a quick example to illustrate how you might use reflection in .NET Core:

```csharp
using System;
using System.Reflection;

public class Example
{
    public string Name { get; set; }

    public void SayHello()
    {
        Console.WriteLine("Hello, " + Name);
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        // Create an instance of Example
        Type exampleType = typeof(Example);
        object exampleInstance = Activator.CreateInstance(exampleType);

        // Set the Name property
        PropertyInfo nameProperty = exampleType.GetProperty("Name");
        nameProperty.SetValue(exampleInstance, "World");

        // Invoke the SayHello method
        MethodInfo sayHelloMethod = exampleType.GetMethod("SayHello");
        sayHelloMethod.Invoke(exampleInstance, null);
    }
}
```

In this example:

- We use `Activator.CreateInstance` to create an instance of the `Example` class.
- `PropertyInfo.GetProperty` is used to access the `Name` property, and we use `SetValue` to set its value.
- `MethodInfo.GetMethod` is used to access the `SayHello` method, and we use `Invoke` to call it.

Reflection can be a double-edged sword—it offers great flexibility but can also lead to less maintainable code if overused. Use it wisely!
