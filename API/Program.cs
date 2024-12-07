using System.Text;
using API.Data;
using API.Services.Users;
using API.Validations.Users;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models.DTOs.Users;
using Models.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();

//DbContext
builder.Services.AddDbContext<AppDbContext>(o =>
{
    o.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});
//Authentication
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

//Services
builder.Services.AddScoped<IUsersService, UsersService>();

//Validations
builder.Services.AddScoped<IValidator<LoginRequestDto>, UserLoginValidation>();
builder.Services.AddScoped<IValidator<AddUserDto>, AddUserValidation>();
builder.Services.AddScoped<IValidator<UpdateUserDto>, UpdateUserValidation>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    var adminExists = context.Users.Any(u => u.Role == UserRole.Admin);

    if (!adminExists)
    {
        await context.Users.AddAsync(new User()
        {
            Email = "admin@admin.com",
            FullName = "Admin User",
            Role = UserRole.Admin,
            Password = BCrypt.Net.BCrypt.HashPassword("admin123")
        });
        
        await context.SaveChangesAsync();
    }
}

app.Run();