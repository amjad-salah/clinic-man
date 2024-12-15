using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.Entities;

namespace Models.DTOs.Billings;

public class UpsertBillingDto
{
    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }

    public decimal SubTotal { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal RemainingBalance { get; set; }
    public BillStatus Status { get; set; }
    public int PatientId { get; set; }
    public int AppointmentId { get; set; }
}