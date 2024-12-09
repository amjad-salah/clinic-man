using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.Entities;

namespace Models.DTOs.Patients;

public class UpsertPatientDto
{
    public string FullName { get; set; } = string.Empty;
    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly DoB { get; set; }
    public Gender Gender { get; set; }
    public string PhoneNo { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Allergies { get; set; } = String.Empty;
}