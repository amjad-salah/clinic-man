using Models;
using Models.DTOs.Users;

namespace Frontend.Services.Users;

public interface IUsersService
{
    Task<LoginResponseDto> Login(LoginRequestDto request);
    Task<GeneralResponse> GetUsers();
    Task<GeneralResponse> GetUserById(int id);
    Task<GeneralResponse> AddUser(AddUserDto userDto);
    Task<GeneralResponse> UpdateUser(int id, UpdateUserDto userDto);
    Task<GeneralResponse> DeleteUser(int id);
}