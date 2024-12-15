using Models;
using Models.DTOs.Users;

namespace API.Services.Users;

public interface IUsersService
{
    Task<GeneralResponse> Login(string email, string password);
    Task<GeneralResponse> GetUsers();
    Task<GeneralResponse> GetUserById(int id);
    Task<GeneralResponse> AddUser(AddUserDto userDto);
    Task<GeneralResponse> UpdateUser(int id, UpdateUserDto userDto);
    Task<GeneralResponse> DeleteUser(int id);
}