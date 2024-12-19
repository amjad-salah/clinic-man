namespace Models.DTOs.Users;

public class UsersResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<UserDto>? Users { get; set; }
    public UserDto? User { get; set; }
}