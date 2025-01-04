namespace Models.DTOs.Payments;

public class PaymentDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public string? TransactionId { get; set; }
    public int BillingId { get; set; }
}