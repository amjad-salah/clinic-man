using FluentValidation;
using Models.DTOs.BillingItems;

namespace API.Validations.BillingItems;

public class UpsertBillingItemValidation : AbstractValidator<UpsertBillingItemDto>
{
    public UpsertBillingItemValidation()
    {
        RuleFor(i => i.BillingId).GreaterThan(0).WithMessage("BillingId is required");
        RuleFor(i => i.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(i => i.Quantity).GreaterThan(0).WithMessage("Quantity is required");
        RuleFor(i => i.UnitPrice).GreaterThan(0).WithMessage("UnitPrice is required");
    }
}