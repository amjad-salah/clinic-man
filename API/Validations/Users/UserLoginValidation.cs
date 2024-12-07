using FluentValidation;
using Models.DTOs.Users;

namespace API.Validations.Users;

public class UserLoginValidation : AbstractValidator<LoginRequestDto>
{
    public UserLoginValidation()
    {
        RuleFor(request => request.Email).NotNull().NotEmpty().EmailAddress().WithMessage("Email is required");
        RuleFor(request => request.Password).NotNull().NotEmpty().WithMessage("Password is required");
    }
}