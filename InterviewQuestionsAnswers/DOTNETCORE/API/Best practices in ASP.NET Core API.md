Building a well-designed and performant ASP.NET Core API requires adherence to several best practices. Here's a detailed guide to ensure your API is robust, maintainable, and secure:

### 1. **Project Structure and Organization**

- **Separation of Concerns**: Organize your project to separate different layers of the application (e.g., controllers, services, repositories, models).
- **Follow SOLID Principles**: Ensure your code adheres to SOLID principles to improve maintainability and scalability.

**Example**:

```
src
├── Controllers
│   └── WeatherForecastController.cs
├── Models
│   └── WeatherForecast.cs
├── Services
│   └── WeatherService.cs
├── Repositories
│   └── WeatherRepository.cs
├── DTOs
│   └── WeatherForecastDTO.cs
└── Startup.cs
```

### 2. **Dependency Injection (DI)**

- **Use Built-in DI**: Leverage the built-in dependency injection container provided by ASP.NET Core.
- **Service Lifetimes**: Choose appropriate lifetimes for your services (Transient, Scoped, Singleton).

**Example**:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddTransient<IWeatherService, WeatherService>();
    services.AddScoped<IWeatherRepository, WeatherRepository>();
}
```

### 3. **Configuration Management**

- **Configuration Files**: Use `appsettings.json` for application settings and configuration.
- **Environment-Specific Configuration**: Use environment-specific configuration files (e.g., `appsettings.Development.json`).

**Example**:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<MySettings>(Configuration.GetSection("MySettings"));
}
```

### 4. **API Versioning**

- **Implement Versioning**: Use URL path, query string, or custom header to version your APIs.
- **Use API Versioning Library**: Leverage libraries like `Microsoft.AspNetCore.Mvc.Versioning`.

**Example**:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddApiVersioning(options =>
    {
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.DefaultApiVersion = new ApiVersion(1, 0);
        options.ReportApiVersions = true;
    });
}
```

### 5. **Error Handling and Logging**

- **Global Error Handling**: Implement global error handling using middleware.
- **Structured Logging**: Use structured logging frameworks like Serilog or NLog.
- **Detailed Error Responses**: Avoid exposing sensitive information in error responses.

**Example**:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}
```

### 6. **Security Best Practices**

- **HTTPS Redirection**: Enforce HTTPS to secure data in transit.
- **Authentication and Authorization**: Implement authentication and authorization mechanisms.
- **Data Protection**: Use ASP.NET Core Data Protection API.
- **CORS**: Configure CORS to control access to your API.

**Example**:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseCors(builder =>
        builder.WithOrigins("https://example.com")
               .AllowAnyMethod()
               .AllowAnyHeader());
}
```

### 7. **Performance Optimization**

- **Asynchronous Programming**: Use async/await for I/O-bound operations.
- **Caching**: Implement response caching and distributed caching.
- **Database Optimization**: Optimize database queries and use `.AsNoTracking()` for read-only queries.

**Example**:

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<WeatherForecast>> GetForecastAsync(int id)
{
    var forecast = await _weatherService.GetForecastByIdAsync(id);
    if (forecast == null)
    {
        return NotFound();
    }
    return Ok(forecast);
}
```

### 8. **Validation and Model Binding**

- **Model Validation**: Use data annotations and model validation attributes.
- **Custom Validation**: Implement custom validation logic if needed.

**Example**:

```csharp
public class WeatherForecastDTO
{
    [Required]
    public string City { get; set; }

    [Range(-100, 100)]
    public int Temperature { get; set; }
}

[HttpPost]
public IActionResult CreateForecast([FromBody] WeatherForecastDTO forecast)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    // Process the forecast
    return Ok();
}
```

### 9. **Documentation**

- **Use Swagger**: Integrate Swagger/OpenAPI for API documentation.
- **API Descriptions**: Add XML comments to your controllers and actions.

**Example**:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
        options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "MyApi.xml"));
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}
```

### 10. **Testing**

- **Unit Testing**: Write unit tests for your services and controllers.
- **Integration Testing**: Implement integration tests to verify the behavior of the entire application.
- **Mocking**: Use mocking frameworks like Moq to isolate components during testing.

**Example**:

```csharp
public class WeatherServiceTests
{
    private readonly Mock<IWeatherRepository> _repositoryMock;
    private readonly WeatherService _service;

    public WeatherServiceTests()
    {
        _repositoryMock = new Mock<IWeatherRepository>();
        _service = new WeatherService(_repositoryMock.Object);
    }

    [Fact]
    public void GetForecastById_ReturnsForecast()
    {
        // Arrange
        var forecast = new WeatherForecast { Id = 1, City = "City", Temperature = 25 };
        _repositoryMock.Setup(repo => repo.GetForecastById(1)).Returns(forecast);

        // Act
        var result = _service.GetForecastById(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(25, result.Temperature);
    }
}
```

By following these best practices, you can ensure that your ASP.NET Core API is well-structured, secure, performant, and maintainable.
