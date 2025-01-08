## [.NET Core Concepts and Labs](https://github.com/utpal-maiti/DOTNET_Projects/)

### Introduction to .NET Core
.NET Core is a free, open-source, cross-platform framework developed by Microsoft for building modern, cloud-based, and internet-connected applications. Unlike the .NET Framework, which is Windows-only, .NET Core can run on Windows, macOS, and Linux. It supports various types of applications, including web, desktop, mobile, cloud, gaming, and IoT.

### Core Concepts

#### 1. **ASP.NET Core**
ASP.NET Core is a web framework for building modern web applications and APIs. It's fast, flexible, and designed to be lightweight.

- **Middleware**: ASP.NET Core applications are composed of middleware components that form a request pipeline. Middleware can handle requests and responses, process data, and call the next middleware in the pipeline.

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.Use(async (context, next) =>
        {
            await context.Response.WriteAsync("Hello from middleware!");
            await next.Invoke();
        });
    }
}
```

#### 2. **Entity Framework Core (EF Core)**
EF Core is an object-relational mapper (ORM) that enables developers to work with databases using C# objects.

- **DbContext**: Represents a session with the database and is used for querying and saving data.

```csharp
public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

#### 3. **Dependency Injection**
Dependency Injection (DI) is a design pattern that helps in achieving Inversion of Control (IoC) between classes and their dependencies.

- **Service Registration**: Services are registered with the DI container in the `Startup` class.

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<IMyService, MyService>();
    }
}
```

#### 4. **Configuration**
Configuration in .NET Core applications is flexible and can come from various sources such as JSON files, environment variables, or command-line arguments.

```csharp
public class Startup
{
    public IConfiguration Configuration { get; }
    
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    
    public void ConfigureServices(IServiceCollection services)
    {
        var mySetting = Configuration.GetValue<string>("MySetting");
    }
}
```

#### 5. **Logging**
Logging in .NET Core is built-in and configurable. It allows capturing and outputting log messages from various parts of the application.

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app, ILogger<Startup> logger)
    {
        app.Use(async (context, next) =>
        {
            logger.LogInformation("Handling request.");
            await next.Invoke();
            logger.LogInformation("Finished handling request.");
        });
    }
}
```

### Conclusion
These are some of the key concepts in .NET Core using C#. Each topic can be explored further, and there's a wealth of resources and documentation available to help you delve deeper.

Sure, let's explore some of the key features of .NET Core in detail using C#:

### 1. Cross-Platform
.NET Core is designed to run on multiple platforms, including Windows, macOS, and Linux. This allows developers to build applications that can be deployed on different operating systems without modification.

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello, .NET Core!");
    }
}
```

### 2. Open Source
.NET Core is open-source, meaning that its source code is available to the public for review and contribution. This encourages community involvement and continuous improvement.

### 3. Performance
.NET Core is optimized for performance and can handle high-throughput, low-latency applications. The runtime and libraries are designed to be efficient and performant.

### 4. Unified Platform
With .NET Core, you can develop a wide range of applications, including web, mobile, desktop, cloud, IoT, and AI. It provides a unified platform with consistent APIs and tools.

### 5. Modular and Lightweight
.NET Core is modular, meaning you can include only the libraries and components you need for your application. This results in a lightweight application with a smaller footprint.

### 6. ASP.NET Core
ASP.NET Core is a powerful framework for building web applications and APIs. It includes features like routing, middleware, dependency injection, and model binding.

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
```

### 7. Entity Framework Core
Entity Framework Core (EF Core) is an ORM for .NET Core that allows developers to work with databases using C# objects. It supports LINQ queries, change tracking, and schema migrations.

```csharp
public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

### 8. Command-Line Interface (CLI)
.NET Core includes a CLI that allows developers to create, build, run, and publish applications using the command line. This is useful for automation and scripting.

```bash
dotnet new console -o MyApp
cd MyApp
dotnet run
```

### 9. Dependency Injection
Dependency Injection (DI) is built into .NET Core, making it easy to manage dependencies and promote loose coupling between components.

```csharp
public interface IMyService
{
    void DoWork();
}

public class MyService : IMyService
{
    public void DoWork()
    {
        Console.WriteLine("Work is done!");
    }
}

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<IMyService, MyService>();
    }
}
```

### 10. Configuration and Logging
.NET Core provides a flexible configuration system that can read settings from various sources such as JSON files, environment variables, and command-line arguments. It also has a built-in logging framework.

```csharp
public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void Configure(IApplicationBuilder app, ILogger<Startup> logger)
    {
        app.Use(async (context, next) =>
        {
            logger.LogInformation("Handling request.");
            await next.Invoke();
            logger.LogInformation("Finished handling request.");
        });
    }
}
```

### Conclusion
These features make .NET Core a versatile, efficient, and powerful framework for modern application development. Each feature is designed to enhance the development experience and provide robust solutions for various application scenarios.