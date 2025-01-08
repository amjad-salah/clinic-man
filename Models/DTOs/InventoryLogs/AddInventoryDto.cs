namespace Models.DTOs.InventoryLogs;

public class AddInventoryDto
{
    public int? SupplierId { get; set; }
    public int InventoryId { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; }
}