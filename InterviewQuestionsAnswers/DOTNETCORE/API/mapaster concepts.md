In .NET Core, the `Mapster` library is a powerful object mapping tool that allows you to map data between different types, such as transferring data from one class to another, especially when working with data transfer objects (DTOs) and entities in web applications.

Here’s a detailed overview of `Mapster` concepts in .NET Core using C#:

### 1. **Installation and Setup**

First, you need to install the `Mapster` package via NuGet in your .NET Core project. You can do this using the Package Manager Console:

```bash
Install-Package Mapster
```

Or by editing your `csproj` file:

```xml
<PackageReference Include="Mapster" Version="6.0.0" />
```

### 2. **Basic Mapping**

Once you have `Mapster` installed, you can use it to map between objects. Here is a simple example of mapping a source object to a destination object:

```csharp
using Mapster;

public class Source
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Destination
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Program
{
    public static void Main()
    {
        var source = new Source { Name = "John", Age = 30 };
        var destination = source.Adapt<Destination>();  // Map from Source to Destination
        
        Console.WriteLine(destination.Name);  // Output: John
        Console.WriteLine(destination.Age);   // Output: 30
    }
}
```

### 3. **Mapping with Custom Configurations**

Mapster allows you to customize the mapping process, such as transforming property names, applying custom converters, and using specific settings.

#### Property Name Mapping

```csharp
public class Source
{
    public string FullName { get; set; }
}

public class Destination
{
    public string Name { get; set; }
}

public class Program
{
    public static void Main()
    {
        TypeAdapterConfig<Source, Destination>.NewConfig()
            .Map(dest => dest.Name, src => src.FullName);

        var source = new Source { FullName = "John Doe" };
        var destination = source.Adapt<Destination>();

        Console.WriteLine(destination.Name);  // Output: John Doe
    }
}
```

#### Custom Value Converter

```csharp
public class Source
{
    public string DateOfBirth { get; set; }
}

public class Destination
{
    public DateTime BirthDate { get; set; }
}

public class Program
{
    public static void Main()
    {
        TypeAdapterConfig<Source, Destination>.NewConfig()
            .Map(dest => dest.BirthDate, src => DateTime.Parse(src.DateOfBirth));

        var source = new Source { DateOfBirth = "1990-01-01" };
        var destination = source.Adapt<Destination>();

        Console.WriteLine(destination.BirthDate);  // Output: 01/01/1990 00:00:00
    }
}
```

### 4. **Mapping Lists and Collections**

Mapster can also map collections such as lists or arrays. Here is an example of mapping a list of objects:

```csharp
public class Source
{
    public string Name { get; set; }
}

public class Destination
{
    public string Name { get; set; }
}

public class Program
{
    public static void Main()
    {
        var sourceList = new List<Source>
        {
            new Source { Name = "John" },
            new Source { Name = "Jane" }
        };

        var destinationList = sourceList.Adapt<List<Destination>>();  // Map from List<Source> to List<Destination>

        foreach (var dest in destinationList)
        {
            Console.WriteLine(dest.Name);  // Output: John, Jane
        }
    }
}
```

### 5. **Projection (LINQ Support)**

Mapster supports projecting directly from a source collection to a destination type using LINQ queries. This is very useful when working with data from databases or APIs.

```csharp
public class Source
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Destination
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Program
{
    public static void Main()
    {
        var sourceList = new List<Source>
        {
            new Source { Name = "John", Age = 30 },
            new Source { Name = "Jane", Age = 25 }
        };

        var destinationList = sourceList.AsQueryable().ProjectToType<Destination>().ToList();

        foreach (var dest in destinationList)
        {
            Console.WriteLine(dest.Name + " " + dest.Age);  // Output: John 30, Jane 25
        }
    }
}
```

### 6. **Advanced Features**

#### Mapping with Nested Objects

Mapster supports deep mapping, which means you can map properties of nested objects:

```csharp
public class Source
{
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
}

public class Destination
{
    public string Name { get; set; }
    public AddressDTO Address { get; set; }
}

public class AddressDTO
{
    public string Street { get; set; }
}

public class Program
{
    public static void Main()
    {
        var source = new Source
        {
            Name = "John",
            Address = new Address { Street = "123 Main St" }
        };

        var destination = source.Adapt<Destination>();  // Map nested Address to AddressDTO

        Console.WriteLine(destination.Name);  // Output: John
        Console.WriteLine(destination.Address.Street);  // Output: 123 Main St
    }
}
```

#### Flattening Complex Structures

Mapster can flatten nested structures for better mapping to a flat model, often used in situations where you need to serialize complex objects into a simpler form:

```csharp
public class Source
{
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
}

public class Destination
{
    public string Name { get; set; }
    public string Street { get; set; }
}

public class Program
{
    public static void Main()
    {
        var source = new Source
        {
            Name = "John",
            Address = new Address { Street = "123 Main St" }
        };

        var destination = source.Adapt<Destination>();

        Console.WriteLine(destination.Name);  // Output: John
        Console.WriteLine(destination.Street);  // Output: 123 Main St
    }
}
```

### 7. **Performance Considerations**

Mapster is designed for high performance, with optimizations that allow it to be faster than traditional mapping frameworks, especially in scenarios with large object graphs. It uses dynamic code generation under the hood for improved performance.

### 8. **Configuration Profiles**

Mapster allows the use of configuration profiles to organize mappings that can be reused. This is helpful for larger applications with many mapping configurations.

```csharp
public class Source
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Destination
{
    public string Name { get; set; }
}

public class SourceToDestinationProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Source, Destination>()
            .Map(dest => dest.Name, src => src.Name);
    }
}

public class Program
{
    public static void Main()
    {
        TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());

        var source = new Source { Name = "John", Age = 30 };
        var destination = source.Adapt<Destination>();

        Console.WriteLine(destination.Name);  // Output: John
    }
}
```

### Conclusion

Mapster in .NET Core provides a powerful, flexible, and fast way to map between different types. It allows simple property mapping, supports deep and flat mapping, handles collections, and provides configurations and projections. Its performance and ease of use make it an excellent choice for object-to-object mapping in various types of applications.