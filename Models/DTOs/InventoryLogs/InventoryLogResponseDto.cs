namespace Models.DTOs.InventoryLogs;

public class InventoryLogResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<InventoryLogDto>? Logs { get; set; }
    public InventoryLogDto? Log { get; set; }
}