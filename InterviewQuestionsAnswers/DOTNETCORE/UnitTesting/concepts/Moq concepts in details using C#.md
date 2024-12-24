Moq is a powerful and popular mocking library for .NET that allows you to create mock objects for your unit tests. Mock objects simulate the behavior of real objects, enabling you to isolate the code you want to test. This helps in verifying interactions, setting expectations, and reducing dependencies on external systems. Let’s dive into the concepts of Moq and see how to use it effectively in your C# unit tests.

### Key Concepts of Moq

#### 1. Creating Mocks
Moq allows you to create mocks for interfaces and classes. The `Mock` class is used to create a mock object.

##### Example:
```csharp
public interface ICalculator
{
    int Add(int a, int b);
    int Subtract(int a, int b);
}

[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Add_CallsAddMethodOnce()
    {
        var mockCalculator = new Mock<ICalculator>();

        // Use the mock object
        var calculator = mockCalculator.Object;
        calculator.Add(2, 3);

        // Verify that the Add method was called once
        mockCalculator.Verify(c => c.Add(2, 3), Times.Once);
    }
}
```
In this example:
- `Mock<ICalculator>` creates a mock object for the `ICalculator` interface.
- `mockCalculator.Object` gets the mock object.
- `mockCalculator.Verify` verifies that the `Add` method was called once with the specified arguments.

#### 2. Setting Up Expectations
You can set up expectations for methods and properties on the mock object using the `Setup` method. This allows you to define the behavior of the mock object when certain methods are called.

##### Example:
```csharp
[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Add_ReturnsExpectedResult()
    {
        var mockCalculator = new Mock<ICalculator>();

        // Set up the mock to return a specific value
        mockCalculator.Setup(c => c.Add(It.IsAny<int>(), It.IsAny<int>())).Returns(5);

        var calculator = mockCalculator.Object;
        int result = calculator.Add(2, 3);

        Assert.AreEqual(5, result);
    }
}
```
In this example:
- `mockCalculator.Setup` configures the `Add` method to return 5, regardless of the input parameters.

#### 3. Verifying Method Calls
Moq allows you to verify that certain methods were called (or not called) on the mock object. This is useful for ensuring that your code interacts with dependencies as expected.

##### Example:
```csharp
[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Subtract_CallsSubtractMethodOnce()
    {
        var mockCalculator = new Mock<ICalculator>();

        var calculator = mockCalculator.Object;
        calculator.Subtract(5, 3);

        // Verify that the Subtract method was called once
        mockCalculator.Verify(c => c.Subtract(5, 3), Times.Once);
    }
}
```
In this example:
- `mockCalculator.Verify` checks that the `Subtract` method was called once with the specified arguments.

#### 4. Using Callback Methods
The `Callback` method allows you to execute custom logic when a method is called on the mock object. This is useful for more advanced scenarios where you need to capture input parameters or execute additional logic.

##### Example:
```csharp
[TestFixture]
public class CalculatorTests
{
    [Test]
    public void Add_ExecutesCallback()
    {
        var mockCalculator = new Mock<ICalculator>();
        int callbackResult = 0;

        // Set up the mock to execute a callback
        mockCalculator.Setup(c => c.Add(It.IsAny<int>(), It.IsAny<int>()))
                      .Callback<int, int>((a, b) => callbackResult = a + b)
                      .Returns(5);

        var calculator = mockCalculator.Object;
        calculator.Add(2, 3);

        // Verify that the callback was executed
        Assert.AreEqual(5, callbackResult);
    }
}
```
In this example:
- `mockCalculator.Setup().Callback()` configures a callback to execute custom logic when the `Add` method is called.

#### 5. Mocking Properties
You can also set up and verify properties on mock objects using Moq.

##### Example:
```csharp
public interface ICalculator
{
    int Result { get; set; }
    int Add(int a, int b);
}

[TestFixture]
public class CalculatorTests
{
    [Test]
    public void ResultProperty_ReturnsExpectedValue()
    {
        var mockCalculator = new Mock<ICalculator>();

        // Set up the Result property
        mockCalculator.SetupProperty(c => c.Result, 10);

        var calculator = mockCalculator.Object;

        // Verify the initial value of the Result property
        Assert.AreEqual(10, calculator.Result);

        // Modify the Result property
        calculator.Result = 20;

        // Verify the modified value of the Result property
        Assert.AreEqual(20, calculator.Result);
    }
}
```
In this example:
- `mockCalculator.SetupProperty` configures the `Result` property with an initial value and allows it to be modified.

### Conclusion

Moq is a versatile and powerful library for creating mock objects in C#. It allows you to set up expectations, verify interactions, and simulate behavior for your unit tests. By using Moq, you can isolate the code you want to test and ensure that it behaves as expected when interacting with dependencies.

