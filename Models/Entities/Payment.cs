using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Payment : BaseEntity
{
    public decimal Amount { get; set; }
    public DateOnly Date { get; set; }

    [MaxLength(100)] public string? TransactionId { get; set; }

    public int BillingId { get; set; }

    [ForeignKey("BillingId")] public virtual Billing? Billing { get; set; }
}