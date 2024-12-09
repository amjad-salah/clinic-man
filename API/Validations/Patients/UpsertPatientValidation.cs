using FluentValidation;
using Models.DTOs.Patients;

namespace API.Validations.Patients;

public class UpsertPatientValidation : AbstractValidator<UpsertPatientDto>
{
    public UpsertPatientValidation()
    {
        RuleFor(p => p.Gender).IsInEnum().WithMessage("Invalid Gender");
        RuleFor(p => p.Address).NotEmpty().WithMessage("Address is required");
        RuleFor(p => p.PhoneNo).NotEmpty().WithMessage("Phone number is required");
        RuleFor(p => p.FullName).NotEmpty().WithMessage("Full name is required");
        RuleFor(p => p.DoB).NotEmpty().WithMessage("Date of birth is required");
        RuleFor(p => p.Allergies).NotEmpty().WithMessage("Allergies is required");
    }
}