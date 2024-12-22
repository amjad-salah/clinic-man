using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Models.DTOs.Users;

namespace Frontend.Pages.Users
{
    public partial class EditUser
    {
        [Parameter]
        public int Id { get; set; }
        
        private string? _errorMessage;

        private UserDto? _user;

        protected override async Task OnInitializedAsync()
        {
            var result = await UsersService.GetUserById(Id);

            if (!result.Success)
            {
                _errorMessage = result.Error!;
            }
            else
            {
                _user = result.User!;
            }
        }

        private async Task Submit()
        {
            var result = await UsersService.UpdateUser(Id,
                new UpdateUserDto()
                {
                    Email = _user!.Email,
                    FullName = _user!.FullName,
                    Role = _user!.Role
                });

            if (!result.Success)
            {
                _errorMessage = result.Error!;
            }
            else
            {
                NavManager.NavigateTo("/users", true);
            }
        }
    }
}