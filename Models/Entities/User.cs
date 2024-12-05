using Microsoft.EntityFrameworkCore;

namespace Models.Entities;

[Index(nameof(Email), Name = "User_Email_Index")]
public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public UserRole Role { get; set; }
}

public enum UserRole
{
    Admin,
    Manager,
    Doctor,
    Nurse,
    Receptionist,
    Support
}