Unit testing is a fundamental practice in software development that involves testing individual components or units of code to ensure they work as expected. In .NET Core, unit testing is made efficient and straightforward with the support of various testing frameworks and tools. Here are the key concepts and practices for unit testing in .NET Core:

### 1. **Testing Frameworks**

.NET Core supports multiple testing frameworks, including:

- **xUnit**: A popular and extensible testing framework.
- **NUnit**: Another widely-used framework, known for its strong community support.
- **MSTest**: The Microsoft testing framework, integrated with Visual Studio.

#### Example: Installing xUnit

To start using xUnit in your .NET Core project, you need to add the xUnit NuGet package:

```bash
dotnet add package xunit
dotnet add package xunit.runner.visualstudio
```

### 2. **Creating a Test Project**

You can create a test project using the .NET Core CLI:

```bash
dotnet new xunit -o MyTestProject
cd MyTestProject
```

This command creates a new xUnit test project.

### 3. **Writing Unit Tests**

A unit test typically consists of three parts: Arrange, Act, and Assert (AAA pattern).

#### Example:

```csharp
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_ShouldReturnSumOfTwoNumbers()
    {
        // Arrange
        var calculator = new Calculator();
        int a = 5;
        int b = 3;

        // Act
        int result = calculator.Add(a, b);

        // Assert
        Assert.Equal(8, result);
    }
}

public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}
```

In this example, we are testing a simple `Calculator` class to ensure that the `Add` method returns the correct sum of two numbers.

### 4. **Running Unit Tests**

You can run your unit tests using the .NET Core CLI:

```bash
dotnet test
```

This command builds the test project and runs all the tests, providing feedback on whether the tests passed or failed.

### 5. **Test Attributes**

Test attributes are used to define and control the behavior of tests:

- `[Fact]`: Indicates a test method that has no parameters.
- `[Theory]`: Indicates a test method that can take multiple sets of parameters (data-driven tests).

#### Example:

```csharp
public class CalculatorTests
{
    [Theory]
    [InlineData(5, 3, 8)]
    [InlineData(10, 0, 10)]
    [InlineData(-1, -1, -2)]
    public void Add_ShouldReturnSumOfTwoNumbers(int a, int b, int expected)
    {
        // Arrange
        var calculator = new Calculator();

        // Act
        int result = calculator.Add(a, b);

        // Assert
        Assert.Equal(expected, result);
    }
}
```

### 6. **Mocking**

Mocking is a technique used to create fake objects or mock dependencies to isolate the unit of work being tested. Popular mocking frameworks include Moq and NSubstitute.

#### Example Using Moq:

```bash
dotnet add package Moq
```

```csharp
using Moq;
using Xunit;

public class OrderServiceTests
{
    [Fact]
    public void PlaceOrder_ShouldCallSaveMethodOnce()
    {
        // Arrange
        var mockRepository = new Mock<IOrderRepository>();
        var service = new OrderService(mockRepository.Object);

        // Act
        service.PlaceOrder(new Order());

        // Assert
        mockRepository.Verify(r => r.Save(It.IsAny<Order>()), Times.Once);
    }
}

public interface IOrderRepository
{
    void Save(Order order);
}

public class OrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public void PlaceOrder(Order order)
    {
        _repository.Save(order);
    }
}

public class Order { }
```

In this example, we are mocking the `IOrderRepository` interface to test the `OrderService` class without relying on the actual implementation of the repository.

### 7. **Code Coverage**

Code coverage is a measure of how much of the code is tested by unit tests. Tools like Coverlet can be used to measure code coverage in .NET Core.

#### Example:

```bash
dotnet add package coverlet.msbuild
dotnet test /p:CollectCoverage=true
```

### Summary

- **Testing Frameworks**: xUnit, NUnit, MSTest.
- **Test Project**: Creating test projects using the .NET Core CLI.
- **Writing Tests**: Using the Arrange-Act-Assert pattern.
- **Running Tests**: Running tests using the .NET Core CLI.
- **Test Attributes**: `[Fact]` for simple tests and `[Theory]` for data-driven tests.
- **Mocking**: Using frameworks like Moq to create mock dependencies.
- **Code Coverage**: Measuring code coverage using tools like Coverlet.

By understanding and implementing these unit testing concepts in .NET Core, you can ensure your code is reliable, maintainable, and of high quality.
