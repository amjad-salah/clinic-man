namespace Models.DTOs.BillingItems;

public class UpsertBillingItemDto
{
    public string Description { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public int BillingId { get; set; }
}