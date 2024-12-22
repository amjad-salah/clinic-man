using System.Net.Http.Headers;
using System.Net.Http.Json;
using Blazored.LocalStorage;
using Models.DTOs.Doctors;
using Models.DTOs.Users;

namespace Frontend.Services.Doctors;

public class DoctorsService(HttpClient httpClient,
    ILocalStorageService localStorageService) : IDoctorsService
{
    public async Task<DoctorResponseDto?> GetDoctors()
    {
        DoctorResponseDto? result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.GetAsync("/api/doctors");

        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
            return result;
        }

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
            
        result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
        return result;
    }

    public async Task<DoctorResponseDto> GetDoctorById(int id)
    {
        DoctorResponseDto? result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.GetAsync($"/api/doctors/{id}");
        
        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
            return result;
        }

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
            
        result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
        return result;
    }

    public async Task<DoctorResponseDto> AddDoctor(UpsertDoctorDto doctor)
    {
        DoctorResponseDto? result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.PostAsJsonAsync("/api/doctors", doctor);
        
        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
            return result;
        }

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
            
        result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
        return result;

    }

    public async Task<DoctorResponseDto> UpdateDoctor(int id, UpsertDoctorDto doctor)
    {
        DoctorResponseDto? result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.PutAsJsonAsync($"/api/doctors/{id}", doctor);
        
        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
            return result;
        }

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
            
        result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
        return result;
    }

    public async Task<DoctorResponseDto> DeleteDoctor(int id)
    {
        DoctorResponseDto? result = new();
        
        var token = await localStorageService.GetItemAsync<string>("auth");
        
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        var response = await httpClient.DeleteAsync($"/api/doctors/{id}");
        
        if (response.IsSuccessStatusCode)
        {
            result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
            return result;
        }

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
            
        result = (await response.Content.ReadFromJsonAsync<DoctorResponseDto>())!;
        return result;
    }
}