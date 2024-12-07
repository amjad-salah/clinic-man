using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Extensions;
using Models;
using Models.DTOs.Users;
using Models.Entities;

namespace API.Services.Users;

public class UsersService(AppDbContext context, 
    IConfiguration configuration) : IUsersService
{
    public async Task<GeneralResponse> Login(string email, string password)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        
        if (user == null)
            return new GeneralResponse() { Success = false, Error = "Invalid credentials" };
        
        var passwordMatch = BCrypt.Net.BCrypt.Verify(password, user.Password);
        
        if (!passwordMatch)
            return new GeneralResponse() { Success = false, Error = "Invalid credentials" };

        var token = GenerateToken(user);
        
        return new GeneralResponse() { Success = true, Data = new { user.FullName, user.Email, Token = token } };
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var userClaims = new Claim[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.GetDisplayName())
        };

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Issuer"],
            claims: userClaims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
            );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<GeneralResponse> GetUsers()
    {
        var users = await context.Users.AsNoTracking().ProjectToType<UserDto>().ToListAsync();
        
        return new GeneralResponse() { Success = true, Data = users };
    }

    public async Task<GeneralResponse> GetUserById(int id)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        
        if (user == null)
            return new GeneralResponse() { Success = false, Error = "User not found" };
        
        var userDto = user.Adapt<UserDto>();
        
        return new GeneralResponse() { Success = true, Data = userDto };
    }

    public async Task<GeneralResponse> AddUser(AddUserDto userDto)
    {
        var existUser = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => 
            u.Email == userDto.Email);
        
        if (existUser != null)
            return new GeneralResponse() { Success = false, Error = "User already exists" };
        
        var newUser = userDto.Adapt<User>();
        
        context.Users.Add(newUser);
        newUser.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true, Data = new { Id = newUser.Id } };
    }

    public async Task<GeneralResponse> UpdateUser(int id, UpdateUserDto userDto)
    {
        var existUser = await context.Users.FindAsync(id);
        
        if (existUser == null)
            return new GeneralResponse() { Success = false, Error = "User not found" };

        if (existUser.Email != userDto.Email)
        {
            var emailUser = await context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            
            if (emailUser != null)
                return new GeneralResponse() { Success = false, Error = "User already exists" };
        }
        
        existUser.Email = userDto.Email;
        existUser.FullName = userDto.FullName;
        existUser.Role = userDto.Role;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true };
    }

    public async Task<GeneralResponse> DeleteUser(int id)
    {
        var user = await context.Users.FindAsync(id);
        
        if (user == null)
            return new GeneralResponse() { Success = false, Error = "User not found" };
        
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true };
    }
}