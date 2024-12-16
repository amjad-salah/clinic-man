using Models.DTOs.InventoryLogs;

namespace Models.DTOs.Suppliers;

public class SupplierDetailsDto
{
    public string Name { get; set; }
    public string ContactInfo { get; set; }
    public string Address { get; set; }
    public List<InventoryLogDto>? Logs { get; set; }
}