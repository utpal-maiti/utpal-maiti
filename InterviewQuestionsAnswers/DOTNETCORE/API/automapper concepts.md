AutoMapper is a popular object-to-object mapping library in .NET, commonly used to simplify the process of transferring data between objects, such as from a domain model to a DTO (Data Transfer Object) or vice versa. It helps reduce boilerplate code and improves maintainability by automating mapping logic. Here's a detailed explanation of AutoMapper concepts in .NET Core using C#:

### 1. **Installation**
First, install AutoMapper via NuGet Package Manager or using the command:
```bash
dotnet add package AutoMapper
```

If you are using AutoMapper.Extensions.Microsoft.DependencyInjection, you can also add it:
```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

### 2. **Basic Concepts**

#### 2.1 **Mapping Configuration**
The core concept of AutoMapper is the **mapping configuration**. It defines how one object should be mapped to another. You usually set this up in a profile class.

```csharp
public class MyProfile : Profile
{
    public MyProfile()
    {
        CreateMap<Source, Destination>();
    }
}
```

In this example, AutoMapper will automatically map properties between the `Source` and `Destination` objects, provided their names and types are compatible.

#### 2.2 **CreateMap**
`CreateMap<TSource, TDestination>()` is used to define the mapping between two types. The method matches properties based on name and type. If the names and types match, AutoMapper will automatically map those properties.

#### 2.3 **Profile**
A **Profile** is a class that contains all the mappings. You can define one or more profiles, which is helpful when you have a large application with different areas that require specific mappings.

Example:
```csharp
public class Source
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class Destination
{
    public int Id { get; set; }
    public string FullName { get; set; }
}

public class MyProfile : Profile
{
    public MyProfile()
    {
        CreateMap<Source, Destination>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Name));
    }
}
```

In the above example, `FullName` in the `Destination` is mapped from the `Name` property in the `Source`.

#### 2.4 **AutoMapper Initialization**
In a typical .NET Core application, AutoMapper is configured in `Startup.cs` or `Program.cs` to be injected as a dependency.

In `Program.cs` or `Startup.cs`:
```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MyProfile)); // Register Profile
    }
}
```

This will register AutoMapper and your profiles for dependency injection.

### 3. **Advanced Mapping Features**

#### 3.1 **Custom Mappings**
You can create custom mapping logic using `ForMember` for more advanced scenarios.

```csharp
CreateMap<Source, Destination>()
    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Name.ToUpper()));
```

This customizes the `FullName` to be upper-cased when mapping.

#### 3.2 **Value Converters**
AutoMapper allows you to define custom value converters to convert properties during the mapping process.

```csharp
CreateMap<Source, Destination>()
    .ForMember(dest => dest.Date, opt => opt.ConvertUsing(new CustomDateConverter()));
```

Custom date converter:

```csharp
public class CustomDateConverter : IValueConverter<DateTime, string>
{
    public string Convert(DateTime sourceMember, ResolutionContext context)
    {
        return sourceMember.ToString("yyyy-MM-dd");
    }
}
```

#### 3.3 **Conditional Mapping**
You can also use conditions to map properties based on certain conditions:

```csharp
CreateMap<Source, Destination>()
    .ForMember(dest => dest.FullName, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)));
```

This will only map `FullName` if `Name` is not null or empty.

#### 3.4 **Flattening**
AutoMapper can automatically flatten nested objects into a flat structure.

Example with nested objects:

```csharp
public class Source
{
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
}

public class Destination
{
    public string Street { get; set; }
    public string City { get; set; }
}

CreateMap<Source, Destination>();
```

AutoMapper will automatically map `Source.Address.Street` to `Destination.Street` and `Source.Address.City` to `Destination.City`.

#### 3.5 **Reverse Mapping**
You can also create reverse mappings using `.ReverseMap()`:

```csharp
CreateMap<Source, Destination>()
    .ReverseMap();
```

This means both `Source` to `Destination` and `Destination` to `Source` are automatically configured.

### 4. **Mapping Collections**
AutoMapper can handle mapping of collections like lists or arrays. You simply need to map the source collection to the destination collection.

```csharp
List<Source> sourceList = new List<Source> { new Source() { Id = 1, Name = "John" } };
List<Destination> destinationList = _mapper.Map<List<Destination>>(sourceList);
```

### 5. **Mapping Complex Types**
For more complex scenarios where mapping requires transformation or more intricate logic, you can use `ForPath` or `ConvertUsing` for nested properties.

```csharp
CreateMap<Source, Destination>()
    .ForPath(dest => dest.NestedProperty.SubProperty, opt => opt.MapFrom(src => src.SomeProperty));
```

### 6. **ProjectTo (Using with LINQ)**
When working with LINQ queries and projecting data, AutoMapper provides `ProjectTo` to perform the mapping directly in the query, which avoids loading unnecessary data into memory.

Example:
```csharp
var query = dbContext.Sources
    .ProjectTo<Destination>(_mapper.ConfigurationProvider)
    .ToList();
```

### 7. **Testing Mappings**
It's important to verify your mappings to avoid runtime errors. You can validate mappings by using `AssertConfigurationIsValid()`:

```csharp
_mapper.ConfigurationProvider.AssertConfigurationIsValid();
```

This checks that all mappings are valid at startup.

### 8. **Error Handling**
AutoMapper will throw exceptions for invalid mappings or if it encounters issues such as null values or mismatched types. You can catch these exceptions and handle them accordingly.

### 9. **Performance Considerations**
- **Avoid mapping the same objects multiple times**: Store the result of mappings when needed, especially in high-performance scenarios.
- **Use `ProjectTo` for database queries**: It ensures that only required data is loaded from the database.

### Example Code Summary
Here is a full example integrating AutoMapper into a .NET Core application:

```csharp
public class Source
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class Destination
{
    public int Id { get; set; }
    public string FullName { get; set; }
}

public class MyProfile : Profile
{
    public MyProfile()
    {
        CreateMap<Source, Destination>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Name));
    }
}

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MyProfile));
    }
}
```

In your controller or service:

```csharp
public class MyService
{
    private readonly IMapper _mapper;

    public MyService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public Destination GetMappedData(Source source)
    {
        return _mapper.Map<Destination>(source);
    }
}
```

### Conclusion
AutoMapper is a powerful tool that can significantly reduce the effort involved in transferring data between objects. With its ability to handle basic mappings, custom conversions, and complex transformations, AutoMapper is an essential library for many .NET developers, especially when working with APIs or separating concerns in a layered architecture.