using FluentValidation;
using Models.DTOs.Appointments;

namespace API.Validations.Appointments;

public class UpsertAppointmentValidation : AbstractValidator<UpsertAppointmentDto>
{
    public UpsertAppointmentValidation()
    {
        RuleFor(a => a.DoctorId).GreaterThan(0).WithMessage("The doctor is required");
        RuleFor(a => a.PatientId).GreaterThan(0).WithMessage("The patient is required");
        RuleFor(a => a.Date).NotEmpty().WithMessage("The date is required");
        RuleFor(a => a.Time).NotEmpty().WithMessage("The time is required");
        RuleFor(a => a.Reason).NotEmpty().WithMessage("The reason is required")
            .MaximumLength(255).WithMessage("The reason must be less than 255 characters");
        RuleFor(a => a.Status).IsInEnum().WithMessage("The status is required");
    }
}