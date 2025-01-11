using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.DTOs.AppointmentTypes;
using Models.DTOs.Doctors;
using Models.DTOs.Patients;
using Models.Entities;

namespace Models.DTOs.Appointments;

public class AppointmentDto
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly Time { get; set; }

    public int AppointmentTypeId { get; set; }
    public AppointmentStatus Status { get; set; }
    public AppointmentTypeDto? AppointmentType { get; set; }
    public PatientDto? Patient { get; set; }
    public DoctorDto? Doctor { get; set; }
}