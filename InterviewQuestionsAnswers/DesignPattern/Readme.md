Design patterns are solutions to common problems that software developers face. They provide a standardized way to build and solve problems in software design, making it easier to manage complexity and improve code readability and reusability. Here are some key design patterns in C# with examples:

### **Creational Design Patterns**

1. **Singleton Pattern**
   - **Purpose**: Ensure a class has only one instance and provide a global point of access to it.
   - **Example**:
     ```csharp
     public class Singleton
     {
         private static Singleton _instance;

         private Singleton() { }

         public static Singleton Instance
         {
             get
             {
                 if (_instance == null)
                 {
                     _instance = new Singleton();
                 }
                 return _instance;
             }
         }
     }
     ```

2. **Factory Method Pattern**
   - **Purpose**: Define an interface for creating an object, but let subclasses alter the type of objects that will be created.
   - **Example**:
     ```csharp
     public interface IProduct
     {
         void DoSomething();
     }

     public class ConcreteProductA : IProduct
     {
         public void DoSomething()
         {
             Console.WriteLine("Product A");
         }
     }

     public class ConcreteProductB : IProduct
     {
         public void DoSomething()
         {
             Console.WriteLine("Product B");
         }
     }

     public abstract class Creator
     {
         public abstract IProduct FactoryMethod();
     }

     public class ConcreteCreatorA : Creator
     {
         public override IProduct FactoryMethod()
         {
             return new ConcreteProductA();
         }
     }

     public class ConcreteCreatorB : Creator
     {
         public override IProduct FactoryMethod()
         {
             return new ConcreteProductB();
         }
     }
     ```

### **Structural Design Patterns**

3. **Adapter Pattern**
   - **Purpose**: Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
   - **Example**:
     ```csharp
     public interface ITarget
     {
         void Request();
     }

     public class Adaptee
     {
         public void SpecificRequest()
         {
             Console.WriteLine("Specific Request");
         }
     }

     public class Adapter : ITarget
     {
         private readonly Adaptee _adaptee;

         public Adapter(Adaptee adaptee)
         {
             _adaptee = adaptee;
         }

         public void Request()
         {
             _adaptee.SpecificRequest();
         }
     }
     ```

4. **Decorator Pattern**
   - **Purpose**: Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
   - **Example**:
     ```csharp
     public abstract class Component
     {
         public abstract void Operation();
     }

     public class ConcreteComponent : Component
     {
         public override void Operation()
         {
             Console.WriteLine("ConcreteComponent Operation");
         }
     }

     public abstract class Decorator : Component
     {
         protected Component _component;

         public void SetComponent(Component component)
         {
             _component = component;
         }

         public override void Operation()
         {
             if (_component != null)
             {
                 _component.Operation();
             }
         }
     }

     public class ConcreteDecoratorA : Decorator
     {
         public override void Operation()
         {
             base.Operation();
             Console.WriteLine("ConcreteDecoratorA Operation");
         }
     }
     ```

### **Behavioral Design Patterns**

5. **Observer Pattern**
   - **Purpose**: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
   - **Example**:
     ```csharp
     public interface IObserver
     {
         void Update();
     }

     public interface ISubject
     {
         void Attach(IObserver observer);
         void Detach(IObserver observer);
         void Notify();
     }

     public class ConcreteSubject : ISubject
     {
         private readonly List<IObserver> _observers = new();

         public void Attach(IObserver observer)
         {
             _observers.Add(observer);
         }

         public void Detach(IObserver observer)
         {
             _observers.Remove(observer);
         }

         public void Notify()
         {
             foreach (var observer in _observers)
             {
                 observer.Update();
             }
         }
     }

     public class ConcreteObserver : IObserver
     {
         public void Update()
         {
             Console.WriteLine("Observer Updated");
         }
     }
     ```

6. **Strategy Pattern**
   - **Purpose**: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
   - **Example**:
     ```csharp
     public interface IStrategy
     {
         void Execute();
     }

     public class ConcreteStrategyA : IStrategy
     {
         public void Execute()
         {
             Console.WriteLine("Strategy A");
         }
     }

     public class ConcreteStrategyB : IStrategy
     {
         public void Execute()
         {
             Console.WriteLine("Strategy B");
         }
     }

     public class Context
     {
         private readonly IStrategy _strategy;

         public Context(IStrategy strategy)
         {
             _strategy = strategy;
         }

         public void ExecuteStrategy()
         {
             _strategy.Execute();
         }
     }
     ```

These design patterns provide proven solutions to common problems and can help you build more robust and maintainable software.