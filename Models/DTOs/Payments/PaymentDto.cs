namespace Models.DTOs.Payments;

public class PaymentDto
{
    public decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public string? TransactionId { get; set; }
    public int BillingId { get; set; }
}