Decorators in Python are a powerful tool that allows you to modify or extend the behavior of functions or methods without altering their code directly. They are implemented as higher-order functions (functions that take another function as an argument or return a function).

### Key Concepts

1. **Function as First-Class Objects**:
   In Python, functions are first-class objects. This means they can be passed as arguments, returned from other functions, and assigned to variables.

2. **Closure**:
   Decorators often rely on closures, where an inner function retains access to the variables of the enclosing scope.

3. **Wrapper Function**:
   A decorator typically defines an inner function (a "wrapper") that adds functionality before or after calling the original function.

---

### Syntax

The `@decorator` syntax is syntactic sugar for wrapping a function with a decorator.

#### Example 1: Basic Decorator

```python
def simple_decorator(func):
    def wrapper():
        print("Before the function call")
        func()
        print("After the function call")
    return wrapper

@simple_decorator
def greet():
    print("Hello, World!")

greet()
```

**Explanation**:

- `@simple_decorator` applies the decorator to the `greet` function.
- Calling `greet()` runs `wrapper()` instead, which adds behavior before and after the original function call.

**Output**:

```
Before the function call
Hello, World!
After the function call
```

---

### Example 2: Decorator with Arguments

Decorators can also accept arguments by defining them as higher-order functions.

```python
def repeat_decorator(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat_decorator(times=3)
def say_hello():
    print("Hello!")

say_hello()
```

**Explanation**:

- The `repeat_decorator` takes an argument (`times`) and returns the actual decorator.
- `say_hello()` is executed three times because of the `times` argument.

**Output**:

```
Hello!
Hello!
Hello!
```

---

### Example 3: Using `functools.wraps`

When creating decorators, it's a good practice to use `functools.wraps` to preserve the original function's metadata.

```python
from functools import wraps

def logging_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args} and {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@logging_decorator
def add(a, b):
    return a + b

add(3, 5)
```

**Output**:

```
Calling add with (3, 5) and {}
add returned 8
```

Without `@wraps`, metadata like `__name__` and `__doc__` of the original function would be overridden by the wrapper function.

---

### Advantages of Decorators

- **Code Reusability**: Common functionality can be reused across multiple functions.
- **Separation of Concerns**: Helps keep the core logic of a function clean.
- **Dynamic Behavior**: Modify functionality at runtime.

---

### Common Use Cases

1. **Logging**: Add logging to functions.
2. **Authentication**: Check user permissions before executing a function.
3. **Performance Measurement**: Measure execution time of functions.
4. **Caching**: Store results of expensive function calls.
