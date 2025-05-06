Design patterns are essential in PHP for creating robust, scalable, and maintainable code. Here are some commonly used design patterns in PHP:

### Creational Patterns

1. **Singleton**: Ensures a class has only one instance and provides a global point of access to it.
2. **Factory**: Creates objects without specifying the exact class of object that will be created.
3. **Builder**: Constructs complex objects step by step.

### Structural Patterns

1. **Adapter**: Allows incompatible interfaces to work together.
2. **Decorator**: Adds behavior to objects dynamically.
3. **Facade**: Provides a simplified interface to a complex subsystem.

### Behavioral Patterns

1. **Observer**: Defines a dependency between objects so that when one object changes state, all its dependents are notified.
2. **Strategy**: Enables selecting an algorithm at runtime.
3. **Command**: Encapsulates a request as an object, thereby allowing parameterization of clients with queues, requests, and operations.

### Example: Singleton Pattern

Here's a simple example of the Singleton pattern in PHP:

```php
class Singleton {
    private static $instance = null;

    private function __construct() {
        // Private constructor to prevent instantiation
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Singleton();
        }
        return self::$instance;
    }
}

// Usage
$singleton = Singleton::getInstance();
```
