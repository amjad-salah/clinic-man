using Models;
using Models.DTOs.Users;

namespace Frontend.Services.Users;

public interface IUsersService
{
    Task<LoginResponseDto> Login(LoginRequestDto request);
    Task<UsersResponseDto?> GetUsers();
    Task<UsersResponseDto> GetUserById(int id);
    Task<UsersResponseDto> AddUser(AddUserDto userDto);
    Task<UsersResponseDto> UpdateUser(int id, UpdateUserDto userDto);
    Task<UsersResponseDto> DeleteUser(int id);
}