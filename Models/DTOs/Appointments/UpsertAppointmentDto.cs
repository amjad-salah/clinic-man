using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.Entities;

namespace Models.DTOs.Appointments;

public class UpsertAppointmentDto
{
    public int PatientId { get; set; }
    public int DoctorId { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly Time { get; set; }

    public int AppointmentTypeId { get; set; }
    public AppointmentStatus Status { get; set; }
}