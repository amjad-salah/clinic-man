namespace Models.DTOs.BillingItems;

public class BillingItemDto
{
    public string Description { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Total { get; set; }
    public int BillingId { get; set; }
}