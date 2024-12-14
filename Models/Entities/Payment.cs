using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Payment : BaseEntity
{
    public Decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public int BillingId { get; set; }
    [MaxLength(100)]
    public string? TransactionId { get; set; }
    [ForeignKey("BillingId")]
    public Billing? Billing { get; set; }
}