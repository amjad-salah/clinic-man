using System.Net.Http.Json;
using Models;
using Models.DTOs.Users;

namespace Frontend.Services.Users;

public class UserService(HttpClient httpClient) : IUsersService
    
{
    public async Task<LoginResponseDto> Login(LoginRequestDto request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/users/login", request);
        
        var result = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        
        return result!;
    }

    public async Task<GeneralResponse> GetUsers()
    {
        var response = await httpClient.GetAsync("/api/users");
        var result = await response.Content.ReadFromJsonAsync<GeneralResponse>();
        
        return result!;
    }

    public async Task<GeneralResponse> GetUserById(int id)
    {
        var response = await httpClient.GetAsync( $"/api/users/{id}");
        var result = await response.Content.ReadFromJsonAsync<GeneralResponse>();
        
        return result!;
    }

    public async Task<GeneralResponse> AddUser(AddUserDto userDto)
    {
        var response = await httpClient.PostAsJsonAsync("/api/users", userDto);
        var result = await response.Content.ReadFromJsonAsync<GeneralResponse>();
        
        return result!;
    }

    public async Task<GeneralResponse> UpdateUser(int id, UpdateUserDto userDto)
    {
        var response = await httpClient.PutAsJsonAsync($"/api/users/{id}", userDto);
        var result = await response.Content.ReadFromJsonAsync<GeneralResponse>();
        
        return result!;
    }

    public async Task<GeneralResponse> DeleteUser(int id)
    {
        var response = await httpClient.DeleteAsync($"/api/users/{id}");
        var result = await response.Content.ReadFromJsonAsync<GeneralResponse>();
        
        return result!;
    }
}