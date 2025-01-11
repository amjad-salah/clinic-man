using FluentValidation;
using Models.DTOs.AppointmentTypes;

namespace API.Validations.AppointmentTypes;

public class UpsertAppointmentTypeValidation : AbstractValidator<UpsertAppointmentTypeDto>
{
    public UpsertAppointmentTypeValidation()
    {
        RuleFor(t => t.Name).NotEmpty().WithMessage("Name is required");
        RuleFor(t => t.Fees).GreaterThan(0).WithMessage("Fees is required");
    }
}