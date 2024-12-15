using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.Entities;

namespace Models.DTOs.Billings;

public class UpsertBillingDto
{
    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }
    public Decimal SubTotal { get; set; }
    public Decimal Tax { get; set; }
    public Decimal Total { get; set; }
    public Decimal PaidAmount { get; set; }
    public Decimal RemainingBalance { get; set; }
    public BillStatus Status { get; set; }
    public int PatientId { get; set; }
    public int AppointmentId { get; set; }
}