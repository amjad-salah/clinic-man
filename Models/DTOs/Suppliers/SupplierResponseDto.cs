namespace Models.DTOs.Suppliers;

public class SupplierResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<SupplierDto>? Suppliers { get; set; }
    public SupplierDetailsDto? Supplier { get; set; }
}