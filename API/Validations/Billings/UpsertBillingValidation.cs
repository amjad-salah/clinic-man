using FluentValidation;
using Models.DTOs.Billings;

namespace API.Validations.Billings;

public class UpsertBillingValidation : AbstractValidator<UpsertBillingDto>
{
    public UpsertBillingValidation()
    {
        RuleFor(b => b.Date).NotEmpty().WithMessage("Please specify a date");
        RuleFor(b => b.AppointmentId).NotEmpty().WithMessage("Appointment is required");
        RuleFor(b => b.Tax).NotEmpty().WithMessage("Tax is required");
    }
}