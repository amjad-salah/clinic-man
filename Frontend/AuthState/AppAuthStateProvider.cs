using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;

namespace Frontend.AuthState;

public class AppAuthStateProvider(ILocalStorageService localStorageService) : AuthenticationStateProvider
{
    private readonly ClaimsPrincipal _anonymous = new(new ClaimsIdentity());

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        string? token = await localStorageService.GetItemAsStringAsync("auth");

        if (string.IsNullOrEmpty(token))
            return await Task.FromResult(new AuthenticationState(_anonymous));

        var (email, role) = ParseToken(token.Trim('"'));

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(role))
            return await Task.FromResult(new AuthenticationState(_anonymous));

        var principal = new ClaimsPrincipal(new ClaimsIdentity(
            [
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role)
            ], "JwtAuth"
        ));
        
        return await Task.FromResult(new AuthenticationState(principal));
    }

    private static (string?, string?) ParseToken(string token)
    {
        if (string.IsNullOrEmpty(token))
            return (null, null);
        
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);
        
        var email = jwtToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;
        var role = jwtToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role)?.Value;
        
        return (email, role);
    }

    public async Task UpdateAuthState(string token)
    {
        var claims = new ClaimsPrincipal();
        
        if (!string.IsNullOrEmpty(token)) 
        {
            var (email, role) = ParseToken(token);
            
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(role))
                return;
            
            claims = new ClaimsPrincipal(new ClaimsIdentity(
                [
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Role, role)
                ], "JwtAuth"
            ));
            
            await localStorageService.SetItemAsync("auth", token);
        }
        else
        {
            await localStorageService.RemoveItemAsync("auth");
        }
        
        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(new ClaimsPrincipal(claims))));
    }
}