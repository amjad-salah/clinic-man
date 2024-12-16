using Models.Entities;

namespace Models.DTOs.InventoryLogs;

public class UpsertInventoryLogDto
{
    public int? SupplierId { get; set; }
    public int InventoryId { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; }
    public LogType Type { get; set; }
}