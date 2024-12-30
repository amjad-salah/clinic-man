using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.DTOs.Appointments;
using Models.DTOs.Billings;
using Models.DTOs.Diagnoses;
using Models.Entities;

namespace Models.DTOs.Patients;

public class PatientDetailsDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly DoB { get; set; }

    public Gender Gender { get; set; }
    public string PhoneNo { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Allergies { get; set; } = string.Empty;
    public List<AppointmentDto> Appointments { get; set; }
    public List<DiagnoseDto> Diagnoses { get; set; }
}