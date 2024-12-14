using FluentValidation;
using Models.DTOs.Prescriptions;

namespace API.Validations.Prescriptions;

public class UpsertPrescriptionValidation : AbstractValidator<UpsertPrescriptionDto>
{
    public UpsertPrescriptionValidation()
    {
        RuleFor(p => p.MedicationName).NotEmpty().MaximumLength(255).WithMessage("Medication name is required");
        RuleFor(p => p.Dosage).NotEmpty().MaximumLength(50).WithMessage("Dosage is required");
        RuleFor(p => p.Duration).NotEmpty().MaximumLength(50).WithMessage("Duration is required");
        RuleFor(p => p.Frequency).NotEmpty().MaximumLength(50).WithMessage("Frequency is required");
        RuleFor(p => p.AppointmentId).NotEmpty().WithMessage("Appointment is required");
    }
}