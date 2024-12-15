using FluentValidation;
using Models.DTOs.Payments;

namespace API.Validations.Payments;

public class UpsertPaymentValidation : AbstractValidator<UpsertPaymentDto>
{
    public UpsertPaymentValidation()
    {
        RuleFor(p => p.BillingId).GreaterThan(0).WithMessage("Billing is required");
        RuleFor(p => p.Amount).GreaterThan(0).WithMessage("Amount is required");
    }
}