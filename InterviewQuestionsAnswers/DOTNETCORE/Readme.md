## [.NET Core Concepts and Labs](https://github.com/utpal-maiti/DOTNET_Projects/)

.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-based, and internet-connected applications. Here are some key concepts associated with .NET Core:

### 1. **Cross-Platform Development**

.NET Core allows you to build applications that can run on multiple operating systems, including Windows, macOS, and Linux. This cross-platform capability ensures that developers can write code once and run it anywhere.

### 2. **High Performance**

.NET Core is designed for high performance. It includes a lightweight, modular runtime and libraries that optimize performance. It supports advanced optimizations, such as Just-In-Time (JIT) compilation and Ahead-Of-Time (AOT) compilation.

### 3. **Unified Framework**

.NET Core provides a unified framework for building various types of applications, including web, desktop, mobile, cloud, gaming, and IoT applications. This unification makes it easier for developers to share code and libraries across different types of projects.

### 4. **Modular Architecture**

.NET Core follows a modular architecture, allowing developers to include only the libraries and components they need for their applications. This modularity helps reduce the application size and improve performance.

### 5. **Package Management**

.NET Core uses NuGet, a package manager, to manage libraries and dependencies. NuGet allows developers to easily add, update, and manage third-party libraries and packages in their projects.

### 6. **Command-Line Interface (CLI)**

.NET Core includes a powerful Command-Line Interface (CLI) that allows developers to create, build, run, and publish .NET Core applications using simple commands. The CLI is essential for automating development workflows and integrating with continuous integration/continuous deployment (CI/CD) pipelines.

### 7. **ASP.NET Core**

ASP.NET Core is a framework for building web applications and APIs. It is built on top of .NET Core and provides features such as MVC (Model-View-Controller), Razor Pages, Blazor, and Web APIs. ASP.NET Core is known for its performance, scalability, and flexibility.

### 8. **Entity Framework Core**

Entity Framework Core (EF Core) is an object-relational mapper (ORM) for .NET Core. It enables developers to work with databases using .NET objects, eliminating the need to write SQL queries. EF Core supports various database providers, including SQL Server, SQLite, MySQL, PostgreSQL, and more.

### 9. **Dependency Injection**

Dependency Injection (DI) is a design pattern supported by .NET Core that allows for the decoupling of dependencies and promotes modular and testable code. .NET Core has built-in support for dependency injection, making it easier to manage service lifetimes and dependencies.

### 10. **Configuration and Options**

.NET Core provides a flexible configuration system that supports various configuration sources, such as JSON files, environment variables, command-line arguments, and more. The configuration system allows for easy management of application settings and options.

### 11. **Logging and Diagnostics**

.NET Core includes built-in logging and diagnostics support, allowing developers to capture and analyze application logs and telemetry. The logging framework is extensible and supports various logging providers, such as Console, Debug, EventSource, and third-party providers like Serilog and NLog.

### 12. **Middleware**

Middleware are components that handle HTTP requests and responses in ASP.NET Core applications. Middleware components are executed in a pipeline, allowing developers to perform tasks such as authentication, authorization, logging, and error handling. Custom middleware can be created to handle specific application requirements.

### 13. **Security**

.NET Core includes various security features, such as authentication, authorization, data protection, and secure communication. ASP.NET Core supports multiple authentication methods, including cookies, JWT (JSON Web Tokens), OAuth, and OpenID Connect. It also provides built-in support for HTTPS, Cross-Site Request Forgery (CSRF) protection, and data encryption.

### 14. **Unit Testing**

.NET Core supports unit testing with popular testing frameworks, such as xUnit, NUnit, and MSTest. The framework includes tools and libraries that make it easy to write, run, and manage unit tests, ensuring the quality and reliability of the code.

### Example: Creating a Simple .NET Core Console Application

1. **Install .NET Core SDK**
   Download and install the .NET Core SDK from the official website: [dotnet.microsoft.com](https://dotnet.microsoft.com/).

2. **Create a New Console Application**
   Open a terminal or command prompt and run the following commands:

   ```bash
   dotnet new console -o MyConsoleApp
   cd MyConsoleApp
   ```

3. **Run the Application**
   Run the following command to build and run the application:

   ```bash
   dotnet run
   ```

   This will create and run a simple console application that prints "Hello, World!" to the console.

### Conclusion

.NET Core is a versatile and powerful framework that enables developers to build a wide range of applications. Its cross-platform capabilities, high performance, and rich set of features make it an excellent choice for modern application development.

Absolutely, let's dive into .NET Core concepts using C#.

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