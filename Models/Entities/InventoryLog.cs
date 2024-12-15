using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class InventoryLog : BaseEntity
{
    public int? SupplierId { get; set; }

    [ForeignKey("SupplierId")] public Supplier? Supplier { get; set; }

    public int InventoryId { get; set; }

    [ForeignKey("InventoryId")] public virtual Inventory? Inventory { get; set; }

    public int Quantity { get; set; }
    public string Description { get; set; } = string.Empty;
    public LogType Type { get; set; }
}

public enum LogType
{
    Insert,
    Usage
}