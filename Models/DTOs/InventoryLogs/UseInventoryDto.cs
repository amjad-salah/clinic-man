namespace Models.DTOs.InventoryLogs;

public class UseInventoryDto
{
    public int InventoryId { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; }
}