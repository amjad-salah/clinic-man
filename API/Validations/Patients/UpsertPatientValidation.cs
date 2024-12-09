using FluentValidation;
using Models.DTOs.Patients;

namespace API.Validations.Patients;

public class UpsertPatientValidation : AbstractValidator<UpsertPatientDto>
{
    public UpsertPatientValidation()
    {
        RuleFor(p => p.Gender).IsInEnum().WithMessage("Invalid Gender");
        RuleFor(p => p.Address).NotEmpty().MaximumLength(255).WithMessage("Address is required");
        RuleFor(p => p.PhoneNo).NotEmpty().MaximumLength(20).WithMessage("Phone number is required");
        RuleFor(p => p.FullName).NotEmpty().MaximumLength(255).WithMessage("Full name is required");
        RuleFor(p => p.DoB).NotEmpty().WithMessage("Date of birth is required");
        RuleFor(p => p.Allergies).MaximumLength(512).NotEmpty().WithMessage("Allergies is required");
    }
}