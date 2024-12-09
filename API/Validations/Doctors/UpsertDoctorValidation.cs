using FluentValidation;
using Models.DTOs.Doctors;

namespace API.Validations.Doctors;

public class UpsertDoctorValidation : AbstractValidator<UpsertDoctorDto>
{
    public UpsertDoctorValidation()
    {
        RuleFor(d => d.UserId).NotEmpty().GreaterThan(0).WithMessage("User is required");
        RuleFor(d => d.Specialization).NotEmpty().MaximumLength(200).WithMessage("Specialization is required");
        RuleFor(d => d.PhoneNo).NotEmpty().MaximumLength(20).WithMessage("Phone number is required");
    }
}