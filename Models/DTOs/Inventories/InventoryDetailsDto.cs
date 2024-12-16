using Models.DTOs.InventoryLogs;

namespace Models.DTOs.Inventories;

public class InventoryDetailsDto
{
    public string Name { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public DateOnly ExpirationDate { get; set; }
    public List<InventoryLogDto>? Logs { get; set; }
}