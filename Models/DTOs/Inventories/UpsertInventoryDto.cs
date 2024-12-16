namespace Models.DTOs.Inventories;

public class UpsertInventoryDto
{
    public string Name { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public DateOnly ExpirationDate { get; set; }
}