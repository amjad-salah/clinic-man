using Microsoft.AspNetCore.Components;
using Models.DTOs.Users;

namespace Frontend.Pages.Users;

public partial class AllUsers : ComponentBase
{
    private string errorMessage = string.Empty;
    private List<UserDto> Users { get; set; } = [];

    protected override async Task OnInitializedAsync()
    {
        var result = await usersService.GetUsers();

        if (!result!.Success)
        {
            errorMessage = result.Error!;
        }
        else
        {
            Users = result.Users!;
        }
    }

    private async Task DeleteUser(int userId)
    {
        var result = await usersService.DeleteUser(userId);

        if (!result!.Success)
        {
            errorMessage = result.Error!;
        }
        else
        {
            NavManager.Refresh();
        }
    }

    private void EditUser(int userId)
    {
        NavManager.NavigateTo($"/users/edit/{userId}");
    }
}