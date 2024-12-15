using FluentValidation;
using Models.DTOs.LabTests;

namespace API.Validations.LabTests;

public class UpsertLabTestValidation : AbstractValidator<UpsertLabTestDto>
{
    public UpsertLabTestValidation()
    {
        RuleFor(t => t.TestName).NotEmpty().MaximumLength(255).WithMessage("Test Name is required");
        RuleFor(t => t.Status).IsInEnum().WithMessage("Status is required");
        RuleFor(t => t.AppointmentId).GreaterThan(0).WithMessage("Appointment is required");
    }
}