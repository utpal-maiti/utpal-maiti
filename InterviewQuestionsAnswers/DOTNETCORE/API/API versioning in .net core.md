API versioning is a critical aspect of maintaining and evolving your API without breaking existing clients. ASP.NET Core provides robust support for API versioning. Here's how you can implement API versioning in your .NET Core application:

### Step-by-Step Guide to API Versioning

1. **Install the Required NuGet Packages:**
   You need to install the `Microsoft.AspNetCore.Mvc.Versioning` and `Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer` packages.
   ```bash
   dotnet add package Microsoft.AspNetCore.Mvc.Versioning
   dotnet add package Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer
   ```

2. **Configure Services in `Startup.cs` or `Program.cs`:**
   Add the versioning services in your `Startup.cs` or `Program.cs`.

   In `Startup.cs` (for ASP.NET Core 5.x and earlier):
   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
       services.AddControllers();
       services.AddApiVersioning(options =>
       {
           options.AssumeDefaultVersionWhenUnspecified = true;
           options.DefaultApiVersion = new ApiVersion(1, 0);
           options.ReportApiVersions = true;
           options.ApiVersionReader = new HeaderApiVersionReader("api-version");
       });
   }
   ```

   In `Program.cs` (for ASP.NET Core 6.0+):
   ```csharp
   var builder = WebApplication.CreateBuilder(args);

   // Add services to the container.
   builder.Services.AddControllers();
   builder.Services.AddApiVersioning(options =>
   {
       options.AssumeDefaultVersionWhenUnspecified = true;
       options.DefaultApiVersion = new ApiVersion(1, 0);
       options.ReportApiVersions = true;
       options.ApiVersionReader = new HeaderApiVersionReader("api-version");
   });

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

3. **Version Your Controllers:**
   Annotate your controllers with the appropriate API version attributes.

   ```csharp
   [ApiController]
   [Route("api/v{version:apiVersion}/[controller]")]
   [ApiVersion("1.0")]
   public class ProductsV1Controller : ControllerBase
   {
       [HttpGet]
       public IActionResult Get()
       {
           return Ok(new { Version = "v1.0", Products = new[] { "Laptop", "Phone" } });
       }
   }

   [ApiController]
   [Route("api/v{version:apiVersion}/[controller]")]
   [ApiVersion("2.0")]
   public class ProductsV2Controller : ControllerBase
   {
       [HttpGet]
       public IActionResult Get()
       {
           return Ok(new { Version = "v2.0", Products = new[] { "Laptop", "Phone", "Tablet" } });
       }
   }
   ```

4. **Use API Versioning in Requests:**
   Specify the API version in the request header or URL.

   **Using URL:**
   ```bash
   curl https://localhost:5001/api/v1.0/products
   curl https://localhost:5001/api/v2.0/products
   ```

   **Using Header:**
   ```bash
   curl -H "api-version: 1.0" https://localhost:5001/api/products
   curl -H "api-version: 2.0" https://localhost:5001/api/products
   ```

### Additional Versioning Options

1. **Query String Versioning:**
   ```csharp
   options.ApiVersionReader = new QueryStringApiVersionReader("v");
   ```

   Usage:
   ```bash
   curl https://localhost:5001/api/products?v=1.0
   ```

2. **Media Type Versioning:**
   ```csharp
   options.ApiVersionReader = new MediaTypeApiVersionReader();
   ```

   Usage:
   ```bash
   curl -H "Accept: application/json; v=1.0" https://localhost:5001/api/products
   ```
