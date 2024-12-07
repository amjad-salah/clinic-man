using FluentValidation;
using Models.DTOs.Doctors;

namespace API.Validations.Doctors;

public class UpsertDoctorValidation : AbstractValidator<UpsertDoctorDto>
{
    public UpsertDoctorValidation()
    {
        RuleFor(d => d.UserId).NotEmpty().GreaterThan(0).WithMessage("User is required");
        RuleFor(d => d.Specialization).NotEmpty().WithMessage("Specialization is required");
        RuleFor(d => d.PhoneNo).NotEmpty().WithMessage("Phone number is required");
    }
}