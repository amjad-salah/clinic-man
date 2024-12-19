using Frontend.AuthState;
using Microsoft.AspNetCore.Components;
using Models.DTOs.Users;

namespace Frontend.Pages.Auth;

public partial class Login : ComponentBase
{
    private string errorMessage = string.Empty;
    private LoginRequestDto LoginModel = new();

    private async Task SubmitAsync()
    {
        var result = await UsersService.Login(LoginModel);

        if (!result.Success)
        {
            errorMessage = result.Error!;
        }
        else
        {
            var appAuthStateProvider = (AppAuthStateProvider)AuthState;
            await appAuthStateProvider.UpdateAuthState(result.Token!);
            NavManager.NavigateTo("/", forceLoad: true);
        }
    }
}