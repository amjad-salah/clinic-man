namespace Models.DTOs.Billings;

public class BillingResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<BillingDto>? Billings { get; set; }
    public BillingDetailsDto? Billing { get; set; }
}