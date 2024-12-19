using Microsoft.AspNetCore.Components;
using Models.DTOs.Users;
using Models.Entities;

namespace Frontend.Pages.Users;

public partial class AddUser : ComponentBase
{
    private AddUserDto model = new();
    private string errorMessage;

    private async Task Submit()
    {
        var result = await UsersService.AddUser(model);

        if (!result.Success) 
        {
            errorMessage = result.Error!;
        }
        else
        {
            NavManager.NavigateTo("/users", forceLoad: true);
        }
    }
}