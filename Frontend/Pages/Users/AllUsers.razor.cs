using Microsoft.AspNetCore.Components;
using Models.DTOs.Users;

namespace Frontend.Pages.Users;

public partial class AllUsers : ComponentBase
{
    private string errorMessage = string.Empty;
    private List<UserDto> Users { get; set; } = [];
    
    protected override async Task OnInitializedAsync()
    {
        var result = await UsersService.GetUsers();

        if (!result!.Success) 
        {
            errorMessage = result.Error!;
        }
        else
        {
            Users = result.Users!;
        }
    }
}