To validate an Azure Entra (formerly Azure Active Directory) token in a .NET Core application, you can use the `Microsoft.Identity.Web` library. Here’s a step-by-step guide:

### 1. **Install the Necessary Packages**
Ensure you have the following NuGet packages installed in your project:
```bash
dotnet add package Microsoft.Identity.Web
dotnet add package Microsoft.Identity.Client
```

### 2. **Configure App Settings**
Add the necessary configuration settings in your `appsettings.json` file:
```json
{
  "AzureAd": {
    "ClientId": "YOUR_CLIENT_ID",
    "TenantId": "YOUR_TENANT_ID",
    "ClientSecret": "YOUR_CLIENT_SECRET",
    "Authority": "https://login.microsoftonline.com/YOUR_TENANT_ID"
  }
}
```

### 3. **Set Up Authentication**
In your `Startup.cs` file, configure the authentication services:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = Configuration["AzureAd:Authority"];
            options.Audience = Configuration["AzureAd:ClientId"];
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["AzureAd:Authority"],
                ValidAudience = Configuration["AzureAd:ClientId"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AzureAd:ClientSecret"]))
            };
        });

    services.AddAuthorization();
}
```

### 4. **Protect Your API Endpoints**
Use the `[Authorize]` attribute to protect your API endpoints:
```csharp
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new string[] { "value1", "value2" });
    }
}
```

### 5. **Validate Tokens in Middleware (Optional)**
If you need more control over token validation, you can create a custom middleware:
```csharp
public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenValidationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token != null)
        {
            var handler = new JwtSecurityTokenHandler();
            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["AzureAd:Authority"],
                ValidAudience = Configuration["AzureAd:ClientId"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AzureAd:ClientSecret"]))
            };

            try
            {
                var jwtToken = handler.ReadJwtToken(token);
                var principal = handler.ValidateToken(token, parameters, out var validatedToken);
                context.User = principal;
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 401;
                return;
            }
        }

        await _next(context);
    }
}
```

### 6. **Register Middleware**
Add the middleware to your `Startup.cs`:
```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseMiddleware<TokenValidationMiddleware>();

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

By following these steps, you can validate Azure Entra tokens in your .NET Core application, ensuring that only authenticated and authorized users can access your API.


