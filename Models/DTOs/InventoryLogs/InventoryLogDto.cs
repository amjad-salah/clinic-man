using Models.DTOs.Inventories;
using Models.DTOs.Suppliers;
using Models.Entities;

namespace Models.DTOs.InventoryLogs;

public class InventoryLogDto
{
    public int? SupplierId { get; set; }
    public int InventoryId { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; }
    public LogType Type { get; set; }
    public SupplierDto? Supplier { get; set; }
    public InventoryDto? Inventory { get; set; }
}