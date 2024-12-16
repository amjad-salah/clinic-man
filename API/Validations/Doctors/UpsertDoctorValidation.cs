using FluentValidation;
using Models.DTOs.Doctors;

namespace API.Validations.Doctors;

public class UpsertDoctorValidation : AbstractValidator<UpsertDoctorDto>
{
    public UpsertDoctorValidation()
    {
        RuleFor(d => d.UserId).NotEmpty().GreaterThan(0).WithMessage("User is required");
        RuleFor(d => d.Specialization).NotEmpty().WithMessage("Specialization is required")
            .MaximumLength(200).WithMessage("Specialization should not exceed 200 characters");
        RuleFor(d => d.PhoneNo).NotEmpty().WithMessage("Phone number is required")
            .MaximumLength(20).WithMessage("Phone number should not exceed 20 characters");
    }
}