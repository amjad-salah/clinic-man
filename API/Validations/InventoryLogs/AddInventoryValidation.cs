using FluentValidation;
using Models.DTOs.InventoryLogs;

namespace API.Validations.InventoryLogs;

public class AddInventoryValidation: AbstractValidator<AddInventoryDto>
{
    public AddInventoryValidation()
    {
        RuleFor(l => l.InventoryId).GreaterThan(0).WithMessage("Inventory is required");
        RuleFor(l => l.SupplierId).GreaterThan(0).WithMessage("Supplier is required");
        RuleFor(l => l.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(l => l.Quantity).GreaterThan(0).WithMessage("Quantity is required");
    }
    
}