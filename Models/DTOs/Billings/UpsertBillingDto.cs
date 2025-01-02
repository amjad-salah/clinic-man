using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.Entities;

namespace Models.DTOs.Billings;

public class UpsertBillingDto
{
    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }

    public decimal Tax { get; set; }
    public int AppointmentId { get; set; }
}