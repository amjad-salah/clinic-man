namespace Models.DTOs.Payments;

public class UpsertPaymentDto
{
    public decimal Amount { get; set; }
    public string? TransactionId { get; set; }
    public int BillingId { get; set; }
}