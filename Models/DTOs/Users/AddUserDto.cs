using Models.Entities;

namespace Models.DTOs.Users;

public record AddUserDto(string FullName, string Email, string Password, UserRole Role);