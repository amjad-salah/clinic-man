namespace Models.DTOs.BillingItems;

public class UpsertBillingItemDto
{
    public string Description { get; set; }
    public int Quantity { get; set; }
    public Decimal UnitPrice { get; set; }
    public Decimal Total { get; set; }
    public int BillingId { get; set; }
}