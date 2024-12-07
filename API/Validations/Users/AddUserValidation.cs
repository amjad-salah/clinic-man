using FluentValidation;
using Models.DTOs.Users;

namespace API.Validations.Users;

public class AddUserValidation : AbstractValidator<AddUserDto>
{
    public AddUserValidation()
    {
        RuleFor(u => u.Email).EmailAddress().WithMessage("Email is required");
        RuleFor(u => u.Password).NotEmpty().WithMessage("Password is required");
        RuleFor(u => u.FullName).NotEmpty().WithMessage("Full name is required");
        RuleFor(u => u.Role).IsInEnum().WithMessage("Role is required");
    }
}