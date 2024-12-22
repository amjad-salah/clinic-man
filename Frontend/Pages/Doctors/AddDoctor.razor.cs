using Frontend.Services.Doctors;
using Frontend.Services.Users;
using Microsoft.AspNetCore.Components;
using Models.DTOs.Doctors;
using Models.DTOs.Users;
using Models.Entities;

namespace Frontend.Pages.Doctors;

public partial class AddDoctor : ComponentBase
{
    private string? _errorMessage;
    private UpsertDoctorDto Doctor = new();
    [Inject]
    private IDoctorsService _doctorsService { get; set; }
    [Inject]
    private IUsersService _usersService { get; set; }
    private List<UserDto> Users = new();

    protected override async Task OnInitializedAsync()
    {
        var result = await _usersService.GetUsers();

        if (!result!.Success)
        {
            _errorMessage = result.Error;
        }
        else
        {
            Users = result.Users!.Where(u => u.Role == UserRole.Doctor).ToList();
        }
    }

    private async Task CreateDoctor()
    {
        var result = await _doctorsService.AddDoctor(Doctor);

        if (!result.Success)
        {
            _errorMessage = result.Error;
        }
        else
        {
            NavManager.NavigateTo("/doctors", true);
        }
    }

}