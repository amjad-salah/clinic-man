using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class Inventory : BaseEntity
{
    [MaxLength(255)] public string Name { get; set; } = string.Empty;

    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public DateOnly ExpirationDate { get; set; }

    public virtual List<InventoryLog>? Logs { get; set; }
}