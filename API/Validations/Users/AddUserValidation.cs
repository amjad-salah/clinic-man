using FluentValidation;
using Models.DTOs.Users;

namespace API.Validations.Users;

public class AddUserValidation : AbstractValidator<AddUserDto>
{
    public AddUserValidation()
    {
        RuleFor(u => u.Email).EmailAddress().WithMessage("Email is required")
            .MaximumLength(100).WithMessage("Email must not exceed 100 characters");
        RuleFor(u => u.Password).NotEmpty().WithMessage("Password is required");
        RuleFor(u => u.FullName).NotEmpty().WithMessage("Full name is required")
            .MaximumLength(255).WithMessage("Full name must not exceed 255 characters");
        RuleFor(u => u.Role).IsInEnum().WithMessage("Role is required");
    }
}