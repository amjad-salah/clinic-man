using FluentValidation;
using Models.DTOs.Inventories;

namespace API.Validations.Inventories;

public class UpsertInventoryValidation : AbstractValidator<UpsertInventoryDto>
{
    public UpsertInventoryValidation()
    {
        RuleFor(i => i.Name).NotEmpty().WithMessage("Name is required.")
            .MaximumLength(255).WithMessage("Name must not exceed 255 characters.");
        RuleFor(i => i.ExpirationDate).NotEmpty().WithMessage("Expiration date is required.");
        RuleFor(i => i.MinQuantity).NotEmpty().WithMessage("Min quantity is required.");
    }
}