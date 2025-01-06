namespace Models.DTOs.Inventories;

public class InventoryResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<InventoryDto>? Inventories { get; set; }
    public InventoryDetailsDto? Inventory { get; set; }
}