To protect an API in .NET Core, you can implement several security measures to ensure that your API is robust and secure. Here's a comprehensive guide to protecting your API in .NET Core:

### 1. Use HTTPS
Ensure that all communication between clients and the server is encrypted. Configure your application to use HTTPS.
```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
                webBuilder.UseUrls("https://localhost:5001"); // Ensure HTTPS is used
            });
}
```

### 2. Implement Authentication and Authorization
Use JWT (JSON Web Tokens) for authentication and role-based authorization.

#### Add JWT Authentication
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            };
        });

    services.AddControllers();
}
```

#### Configure Middleware
```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

### 3. Implement Role-Based Authorization
Authorize users based on their roles.
```csharp
[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Admin access");
    }
}
```

### 4. Input Validation and Data Sanitization
Validate and sanitize user inputs to prevent attacks like SQL injection and XSS.

```csharp
public class User
{
    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
```

### 5. Rate Limiting
Prevent abuse by implementing rate limiting.
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMemoryCache();
    services.AddInMemoryRateLimiting();
    services.Configure<IpRateLimitOptions>(options =>
    {
        options.GeneralRules = new List<RateLimitRule>
        {
            new RateLimitRule
            {
                Endpoint = "*",
                Limit = 100,
                Period = "1m"
            }
        };
    });

    services.AddControllers();
}
```

### 6. API Key Management
Use API keys to control access to your API.
```csharp
public class ApiKeyRequirement : IAuthorizationRequirement { }

public class ApiKeyHandler : AuthorizationHandler<ApiKeyRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ApiKeyRequirement requirement)
    {
        if (context.Resource is HttpContext httpContext)
        {
            if (httpContext.Request.Headers.TryGetValue("X-Api-Key", out var apiKey))
            {
                if (apiKey == "your_api_key_here")
                {
                    context.Succeed(requirement);
                }
            }
        }

        return Task.CompletedTask;
    }
}

public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthorization(options =>
    {
        options.AddPolicy("ApiKeyPolicy", policy =>
        {
            policy.Requirements.Add(new ApiKeyRequirement());
        });
    });

    services.AddSingleton<IAuthorizationHandler, ApiKeyHandler>();
    services.AddControllers();
}
```

### 7. Exception Handling
Configure exception handling to avoid leaking information.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseExceptionHandler("/error");

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
        endpoints.MapGet("/error", async context =>
        {
            var response = new { Message = "An error occurred." };
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(response);
        });
    });
}
```
