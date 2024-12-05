using Models.Entities;

namespace Models.DTOs.Users;

public record UserDto(int Id, string FullName, string Email, UserRole Role);