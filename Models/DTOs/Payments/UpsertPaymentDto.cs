namespace Models.DTOs.Payments;

public class UpsertPaymentDto
{
    public Decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public string? TransactionId { get; set; }
    public int BillingId { get; set; }
}