using Frontend.AuthState;
using Microsoft.AspNetCore.Components;

namespace Frontend.Pages.Auth;

public partial class Logout : ComponentBase
{
    protected override async Task OnInitializedAsync()
    {
        var appAuthStateProvider = (AppAuthStateProvider)AuthState;
        await appAuthStateProvider.UpdateAuthState(null!);
        NavManager.NavigateTo("/", forceLoad: true);
    }
}