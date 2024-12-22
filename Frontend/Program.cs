using Blazored.LocalStorage;
using Frontend;
using Frontend.AuthState;
using Frontend.Services.Doctors;
using Frontend.Services.Users;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("http://localhost:5000") });
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddAuthorizationCore();
builder.Services.AddBlazoredLocalStorage();
builder.Services.AddScoped<AuthenticationStateProvider, AppAuthStateProvider>();
builder.Services.AddScoped<IUsersService, UserService>();
builder.Services.AddScoped<IDoctorsService, DoctorsService>();

await builder.Build().RunAsync();