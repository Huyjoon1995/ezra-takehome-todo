using ezra_takehome_todo.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var env = builder.Environment.EnvironmentName;

if (env == "Test")
{
    builder.Configuration.AddJsonFile("appsettings.Test.json", optional: false, reloadOnChange: true);
}

// For local development only
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhostUI", policy =>
    {
        policy.WithOrigins(
                "https://localhost:59739",
                "http://localhost:59739"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .SetPreflightMaxAge(TimeSpan.FromSeconds(86400)); // Cache preflight for 24 hours
    });
});

// Add EF Core with SQLite
builder.Services.AddDbContext<TodoDbContext>(options =>
{
    var connStr = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlite(connStr);
});
// Add JWT Bearer Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://dev-3fas6re2rfmlpqmh.us.auth0.com/";
        options.Audience = "https://localhost:7038/api";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://dev-3fas6re2rfmlpqmh.us.auth0.com",
            ValidAudience = "https://localhost:7038/api",
            NameClaimType = "sub"
        };


    });

// Add API controllers
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowLocalhostUI");

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
