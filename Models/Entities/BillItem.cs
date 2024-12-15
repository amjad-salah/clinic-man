using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class BillItem : BaseEntity
{
    public string Description { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public Decimal UnitPrice { get; set; }
    public Decimal Total { get; set; }
    public int BillingId { get; set; }
    [ForeignKey("BillingId")]
    public virtual Billing? Billing { get; set; }
}