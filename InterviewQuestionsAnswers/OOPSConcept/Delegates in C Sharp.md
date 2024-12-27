### Delegates in C#
**Delegates** are types that represent references to methods with a specific parameter list and return type. They are used to pass methods as arguments to other methods and to define callback methods.
#### Example of Declaring and Using a Delegate
```csharp
using System;

public class Program
{
    // Declaration of a delegate
    public delegate int Operation(int x, int y);

public static void Main()
    {
        // Instantiating the delegate
        Operation add = Add;
        Operation subtract = Subtract;

        // Using the delegate
        Console.WriteLine("Add: " + add(5, 3));
        Console.WriteLine("Subtract: " + subtract(5, 3));
    }

    public static int Add(int x, int y)
    {
        return x + y;
    }

    public static int Subtract(int x, int y)
    {
        return x - y;
    }
}
```

### Built-In Delegates in C#
.NET provides several built-in delegates in the `System` namespace, which simplifies the use of delegates. Here are some common built-in delegates:
1. **Action Delegate**:
   - Represents a method that takes no parameters and returns void.
   - There are also generic versions that take one or more parameters but return void.

   ```csharp
   Action greet = () => Console.WriteLine("Hello, World!");
   greet();
   ```
   - With Parameters:
   ```csharp
   Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
   greet("Alice");
   ```

2. **Func Delegate**:
   - Represents a method that returns a value. There are generic versions that take zero or more input parameters and return a value.

   ```csharp
   Func<int, int, int> add = (x, y) => x + y;
   int result = add(5, 3);
   Console.WriteLine("Add: " + result);
   ```

3. **Predicate Delegate**:
   - Represents a method that takes a single parameter and returns a boolean.

   ```csharp
   Predicate<int> isPositive = x => x > 0;
   bool result = isPositive(5);
   Console.WriteLine("Is Positive: " + result);
   ```

### Examples of Built-In Delegates

#### Example using `Action`

```csharp
using System;

public class Program
{
    public static void Main()
    {
        Action displayMessage = () => Console.WriteLine("This is an Action delegate example.");
        displayMessage();
    }
}
```

#### Example using `Func`

```csharp
using System;

public class Program
{
    public static void Main()
    {
        Func<int, int, int> multiply = (x, y) => x * y;
        int result = multiply(4, 5);
        Console.WriteLine("Multiply: " + result);
    }
}
```

#### Example using `Predicate`

```csharp
using System;

public class Program
{
    public static void Main()
    {
        Predicate<string> isLongerThan5 = str => str.Length > 5;
        bool result = isLongerThan5("Hello, world!");
        Console.WriteLine("Is longer than 5: " + result);
    }
}
```

### Summary

- **Delegates**: Custom types for method references, allowing methods to be passed as parameters.
- **Built-in Delegates**: Simplify common delegate patterns:
  - `Action`: No return value, can take parameters.
  - `Func`: Returns a value, can take parameters.
  - `Predicate`: Returns a boolean, takes one parameter.
