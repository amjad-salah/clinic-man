using FluentValidation;
using Models.DTOs.Prescriptions;

namespace API.Validations.Prescriptions;

public class UpsertPrescriptionValidation : AbstractValidator<UpsertPrescriptionDto>
{
    public UpsertPrescriptionValidation()
    {
        RuleFor(p => p.MedicationName).NotEmpty().WithMessage("Medication name is required")
            .MaximumLength(255).WithMessage("Medication name must not exceed 255 characters");
        RuleFor(p => p.Dosage).NotEmpty().WithMessage("Dosage is required")
            .MaximumLength(50).WithMessage("Dosage must not exceed 50 characters");
        RuleFor(p => p.Duration).NotEmpty().WithMessage("Duration is required")
            .MaximumLength(50).WithMessage("Duration must not exceed 50 characters");
        RuleFor(p => p.Frequency).NotEmpty().WithMessage("Frequency is required")
            .MaximumLength(50).WithMessage("Frequency must not exceed 50 characters");
        RuleFor(p => p.AppointmentId).NotEmpty().WithMessage("Appointment is required");
    }
}