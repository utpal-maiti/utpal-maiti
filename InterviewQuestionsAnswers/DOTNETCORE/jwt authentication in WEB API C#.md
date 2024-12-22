JWT (JSON Web Token) authentication is a popular method for securing APIs in ASP.NET Core applications. It involves generating a token upon user login, which is then used for subsequent requests to authenticate and authorize the user. Here’s a step-by-step guide to implementing JWT authentication in a Web API:

### 1. **Install the Necessary Packages**
Ensure you have the following NuGet packages installed in your project:
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `System.IdentityModel.Tokens.Jwt`

### 2. **Configure JWT Settings**
Define your JWT settings in the `appsettings.json` file.

```json
"JwtSettings": {
  "Issuer": "YourIssuer",
  "Audience": "YourAudience",
  "Key": "YourSecretKey"
}
```

### 3. **Create the JWT Service**
Create a service to generate the JWT.

```csharp
public class JwtService
{
    private readonly string _key;
    private readonly string _issuer;
    private readonly string _audience;

    public JwtService(IConfiguration config)
    {
        _key = config["JwtSettings:Key"];
        _issuer = config["JwtSettings:Issuer"];
        _audience = config["JwtSettings:Audience"];
    }

    public string GenerateToken(string userId)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

### 4. **Configure Authentication Middleware**
Add JWT authentication to your `Startup.cs`.

#### In `ConfigureServices` method:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    
    services.AddSingleton<JwtService>();

    var key = Encoding.UTF8.GetBytes(Configuration["JwtSettings:Key"]);
    services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Configuration["JwtSettings:Issuer"],
            ValidAudience = Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });
}
```

#### In `Configure` method:
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

### 5. **Create Login Endpoint**
Create an endpoint for user login that generates and returns the JWT.

```csharp
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        // Validate the user credentials (this is just a placeholder logic)
        if (login.Username == "test" && login.Password == "password")
        {
            var token = _jwtService.GenerateToken(login.Username);
            return Ok(new { token });
        }
        return Unauthorized();
    }
}
```

### 6. **Secure API Endpoints**
Use the `[Authorize]` attribute to secure your API endpoints.

```csharp
[Authorize]
[ApiController]
[Route("[controller]")]
public class ValuesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetValues()
    {
        return Ok(new string[] { "Value1", "Value2" });
    }
}
```

With this setup, your Web API is secured using JWT tokens. Clients must include the token in the `Authorization` header as a Bearer token for each request.

Let me know if you need more details or have other questions!