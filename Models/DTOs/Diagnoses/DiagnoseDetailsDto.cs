using Models.DTOs.Appointments;

namespace Models.DTOs.Diagnoses;

public class DiagnoseDetailsDto
{
    public int AppointmentId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
    public AppointmentDto? Appointment { get; set; }
}