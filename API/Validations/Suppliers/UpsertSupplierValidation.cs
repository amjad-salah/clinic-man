using FluentValidation;
using Models.DTOs.Suppliers;

namespace API.Validations.Suppliers;

public class UpsertSupplierValidation : AbstractValidator<UpsertSupplierDto>
{
    public UpsertSupplierValidation()
    {
        RuleFor(s => s.Name).NotEmpty().WithMessage("Name is required").MaximumLength(255)
            .WithMessage("Name must not exceed 255 characters");
        RuleFor(s => s.Address).NotEmpty().WithMessage("Address is required");
        RuleFor(s => s.ContactInfo).NotEmpty().WithMessage("Contact info is required")
            .MaximumLength(255).WithMessage("Contact info must not exceed 255 characters");
    }
}