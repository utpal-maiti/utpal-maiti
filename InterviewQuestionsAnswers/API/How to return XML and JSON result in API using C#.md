Returning XML and JSON results in an API built using ASP.NET Core is quite straightforward. You can configure your API to support both formats, and the client can choose which one to receive by specifying the appropriate `Accept` header. Here's how you can do it:

### Step-by-Step Guide

1. **Set up a new ASP.NET Core Web API project:**
   Create a new project using Visual Studio or the .NET CLI:
   ```bash
   dotnet new webapi -n MyApi
   cd MyApi
   ```

2. **Create a model:**
   Define a model that will be used to return data.
   ```csharp
   public class Product
   {
       public int Id { get; set; }
       public string Name { get; set; }
       public decimal Price { get; set; }
   }
   ```

3. **Create a controller:**
   Add a controller to handle the API endpoints.
   ```csharp
   using Microsoft.AspNetCore.Mvc;
   using System.Collections.Generic;

   [ApiController]
   [Route("[controller]")]
   public class ProductsController : ControllerBase
   {
       private static readonly List<Product> Products = new List<Product>
       {
           new Product { Id = 1, Name = "Laptop", Price = 999.99m },
           new Product { Id = 2, Name = "Smartphone", Price = 499.99m }
       };

       [HttpGet]
       public IActionResult Get()
       {
           return Ok(Products);
       }
   }
   ```

4. **Configure `Startup.cs` or `Program.cs`:**
   Ensure your API is configured to support both JSON and XML formatters.

   In `Program.cs` (for ASP.NET Core 6.0+):
   ```csharp
   var builder = WebApplication.CreateBuilder(args);

   // Add services to the container.
   builder.Services.AddControllers()
       .AddXmlDataContractSerializerFormatters(); // Add XML support

   var app = builder.Build();

   // Configure the HTTP request pipeline.
   if (app.Environment.IsDevelopment())
   {
       app.UseDeveloperExceptionPage();
   }

   app.UseHttpsRedirection();
   app.UseAuthorization();
   app.MapControllers();
   app.Run();
   ```

   In `Startup.cs` (for ASP.NET Core 5.x and earlier):
   ```csharp
   public class Startup
   {
       public void ConfigureServices(IServiceCollection services)
       {
           services.AddControllers()
               .AddXmlDataContractSerializerFormatters(); // Add XML support
       }

       public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
       {
           if (env.IsDevelopment())
           {
               app.UseDeveloperExceptionPage();
           }

           app.UseHttpsRedirection();
           app.UseRouting();
           app.UseAuthorization();
           app.UseEndpoints(endpoints =>
           {
               endpoints.MapControllers();
           });
       }
   }
   ```

5. **Test your API:**
   Now you can test your API using tools like Postman or curl. By setting the `Accept` header to `application/json` or `application/xml`, the API will return data in the requested format.

   For JSON:
   ```bash
   curl -H "Accept: application/json" https://localhost:5001/Products
   ```

   For XML:
   ```bash
   curl -H "Accept: application/xml" https://localhost:5001/Products
   `