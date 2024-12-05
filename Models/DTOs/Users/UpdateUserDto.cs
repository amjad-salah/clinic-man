using Models.Entities;

namespace Models.DTOs.Users;

public record UpdateUserDto(string FullName, string Email, UserRole Role);