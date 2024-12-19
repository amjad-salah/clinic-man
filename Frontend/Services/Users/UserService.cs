using System.Net.Http.Headers;
using System.Net.Http.Json;
using Blazored.LocalStorage;
using Models;
using Models.DTOs.Users;

namespace Frontend.Services.Users;

public class UserService(HttpClient httpClient,
    ILocalStorageService localStorageService) : IUsersService
    
{
    public async Task<LoginResponseDto> Login(LoginRequestDto request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/users/login", request);
        
        var result = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        
        return result!;
    }

    public async Task<UsersResponseDto?> GetUsers()
    {
        UsersResponseDto result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.GetAsync("/api/users");

        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<UsersResponseDto>())!;
            return result;
        }
        else
        {
            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                result.Success = false;
                result.Error = "الرجاء تسجيل الدخول";
                
                return result;
            }

            if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
            {
                result.Success = false;
                result.Error = "ليس لديك الصلاحية لمعاينة هذه الصفحة";
                
                return result;
            }
            
            result = (await response.Content.ReadFromJsonAsync<UsersResponseDto>())!;
            return result;
        }
    }

    public async Task<UsersResponseDto> GetUserById(int id)
    {
        var response = await httpClient.GetAsync( $"/api/users/{id}");
        var result = await response.Content.ReadFromJsonAsync<UsersResponseDto>();
        
        return result!;
    }

    public async Task<UsersResponseDto> AddUser(AddUserDto userDto)
    {
        UsersResponseDto result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.PostAsJsonAsync("/api/users", userDto);
        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<UsersResponseDto>())!;
            return result;
        }
        else
        {
            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                result.Success = false;
                result.Error = "الرجاء تسجيل الدخول";
                
                return result;
            }

            if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
            {
                result.Success = false;
                result.Error = "ليس لديك الصلاحية لمعاينة هذه الصفحة";
                
                return result;
            }
            
            result = (await response.Content.ReadFromJsonAsync<UsersResponseDto>())!;
            return result;
        }
    }

    public async Task<UsersResponseDto> UpdateUser(int id, UpdateUserDto userDto)
    {
        var response = await httpClient.PutAsJsonAsync($"/api/users/{id}", userDto);
        var result = await response.Content.ReadFromJsonAsync<UsersResponseDto>();
        
        return result!;
    }

    public async Task<UsersResponseDto> DeleteUser(int id)
    {
        var response = await httpClient.DeleteAsync($"/api/users/{id}");
        var result = await response.Content.ReadFromJsonAsync<UsersResponseDto>();
        
        return result!;
    }
}