using FluentValidation;
using Models.DTOs.Users;

namespace API.Validations.Users;

public class UpdateUserValidation : AbstractValidator<UpdateUserDto>
{
    public UpdateUserValidation()
    {
        RuleFor(u => u.Email).EmailAddress().WithMessage("Email is required")
            .MaximumLength(100).WithMessage("Email must not exceed 100 characters");
        RuleFor(u => u.FullName).NotEmpty().WithMessage("Full name is required")
            .MaximumLength(255).WithMessage("Full name must not exceed 255 characters");
        RuleFor(u => u.Role).IsInEnum().WithMessage("Role is required");
    }
}