using FluentValidation;
using Models.DTOs.Patients;

namespace API.Validations.Patients;

public class UpsertPatientValidation : AbstractValidator<UpsertPatientDto>
{
    public UpsertPatientValidation()
    {
        RuleFor(p => p.Gender).IsInEnum().WithMessage("Invalid Gender");
        RuleFor(p => p.Address).NotEmpty().WithMessage("Address is required")
            .MaximumLength(255).WithMessage("Address must not exceed 255 characters");
        RuleFor(p => p.PhoneNo).NotEmpty().WithMessage("Phone number is required")
            .MaximumLength(20).WithMessage("Phone number must not exceed 20 characters");
        RuleFor(p => p.FullName).NotEmpty().WithMessage("Full name is required")
            .MaximumLength(255).WithMessage("Full name must not exceed 255 characters");
        RuleFor(p => p.DoB).NotEmpty().WithMessage("Date of birth is required");
        RuleFor(p => p.Allergies).NotEmpty().WithMessage("Allergies is required")
            .MaximumLength(512).WithMessage("Allergies must not exceed 512 characters");
    }
}