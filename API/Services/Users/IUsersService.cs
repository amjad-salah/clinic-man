using Models;
using Models.DTOs.Users;

namespace API.Services.Users;

public interface IUsersService
{
    Task<LoginResponseDto> Login(string email, string password);
    Task<UsersResponseDto> GetUsers();
    Task<UsersResponseDto> GetUserById(int id);
    Task<UsersResponseDto> AddUser(AddUserDto userDto);
    Task<UsersResponseDto> UpdateUser(int id, UpdateUserDto userDto);
    Task<UsersResponseDto> DeleteUser(int id);
}