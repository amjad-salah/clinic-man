using FluentValidation;
using Models.DTOs.InventoryLogs;

namespace API.Validations.InventoryLogs;

public class UpsertInventoryLogValidation : AbstractValidator<UpsertInventoryLogDto>
{
    public UpsertInventoryLogValidation()
    {
        RuleFor(l => l.Type).IsInEnum().WithMessage("Type is required");
        RuleFor(l => l.InventoryId).GreaterThan(0).WithMessage("Inventory is required");
        RuleFor(l => l.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(l => l.Quantity).GreaterThan(0).WithMessage("Quantity is required");
    }
}