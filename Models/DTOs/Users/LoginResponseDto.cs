using Models.Entities;

namespace Models.DTOs.Users;

public class LoginResponseDto
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? FullName { get; set; }
    public UserRole? Role { get; set; }
    public string? Error { get; set; }
}