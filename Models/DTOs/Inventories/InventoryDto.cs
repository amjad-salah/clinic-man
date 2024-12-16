namespace Models.DTOs.Inventories;

public class InventoryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public DateOnly ExpirationDate { get; set; }
}