## [ASP.NET Core API Concepts and Labs](https://github.com/utpal-maiti/DOTNET_CORE/API/)

ASP.NET Core is a powerful framework for building APIs that are scalable, efficient, and secure. Here are some key concepts to understand when working with ASP.NET Core APIs:

### 1. **Routing**

Routing is the mechanism that ASP.NET Core uses to match incoming HTTP requests to the corresponding action methods in controllers.

- **Attribute Routing**: Define routes using attributes directly on controller actions.
- **Convention-Based Routing**: Define routes in the `Startup.cs` file using middleware.

### 2. **Controllers and Actions**

Controllers are classes that handle incoming HTTP requests and generate responses.

- **ControllerBase**: Use this base class for API controllers to avoid functionalities specific to views.
- **Action Methods**: Methods within controllers that handle HTTP requests and return responses.

### 3. **Models**

Models represent the data structure in your application.

- **DTOs (Data Transfer Objects)**: Used to transfer data between client and server.
- **Validation**: Use data annotations to validate model data.

### 4. **Dependency Injection**

ASP.NET Core has built-in support for dependency injection (DI), which makes it easy to manage dependencies and promote loose coupling.

- **Services**: Register services in `Startup.cs` and inject them into controllers or other services.

### 5. **Middleware**

Middleware are components that process incoming HTTP requests and can modify the request or response.

- **Built-in Middleware**: Authentication, authorization, exception handling, etc.
- **Custom Middleware**: Create custom middleware for specific requirements.

### 6. **Filters**

Filters allow you to run code before or after specific stages in the request processing pipeline.

- **Types**: Authorization filters, action filters, result filters, and exception filters.

### 7. **Authentication and Authorization**

Security is a crucial aspect of API development.

- **Authentication**: Verify the identity of users (e.g., JWT, OAuth).
- **Authorization**: Determine what actions authenticated users can perform (e.g., role-based or policy-based).

### 8. **Model Binding**

Model binding maps data from HTTP requests to action method parameters.

- **FromBody, FromQuery, FromRoute**: Attributes to specify the source of data.

### 9. **Response Formatting**

Determine how the API should return data to the client.

- **Content Negotiation**: Return data in the format requested by the client (e.g., JSON, XML).
- **Custom Formatters**: Create custom response formatters if needed.

### 10. **Versioning**

API versioning is essential for maintaining backward compatibility.

- **Query String Versioning**: Pass the version in the query string.
- **URL Path Versioning**: Include the version in the URL path.
- **Header Versioning**: Pass the version in the request headers.

### 11. **CORS (Cross-Origin Resource Sharing)**

### Example of a Basic ASP.NET Core API

#### **Step 1: Create a New API Project**

```bash
dotnet new webapi -o MyApi
cd MyApi
```

#### **Step 2: Define a Model**

Create a `Product` class in the `Models` folder:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

#### **Step 3: Create a Controller**

Create a `ProductsController` in the `Controllers` folder:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> Products = new List<Product>
    {
        new Product { Id = 1, Name = "Product1", Price = 10.00M },
        new Product { Id = 2, Name = "Product2", Price = 20.00M }
    };

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Products);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Product product)
    {
        product.Id = Products.Count + 1;
        Products.Add(product);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}
```

#### **Step 4: Run the Application**

```bash
dotnet run
```

Navigate to `http://localhost:5000/api/products` to interact with your API.

### Conclusion

ASP.NET Core provides a comprehensive framework for building robust and scalable APIs. By understanding and leveraging these concepts, you can create efficient and secure APIs tailored to your application's needs.
