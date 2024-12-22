using Models.Entities;

namespace Models.DTOs.Users;

public class UpdateUserDto
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public UserRole Role { get; set; }
}