using FluentValidation;
using Models.DTOs.Diagnoses;

namespace API.Validations.Diagnoses;

public class UpsertDiagnoseValidation : AbstractValidator<UpsertDiagnoseDto>
{
    public UpsertDiagnoseValidation()
    {
        RuleFor(d => d.AppointmentId).GreaterThan(0).WithMessage("Appointment is required");
        RuleFor(d => d.Diagnosis).NotEmpty().WithMessage("Diagnosis is required");
    }
}