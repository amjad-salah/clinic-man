using Models.DTOs.Appointments;
using Models.DTOs.Patients;

namespace Models.DTOs.Prescriptions;

public class PrescriptionDetailsDto
{
    public int Id { get; set; }
    public string MedicationName { get; set; } = string.Empty;
    public string Dosage { get; set; } = string.Empty;
    public string Frequency { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public int PatientId { get; set; }
    public PatientDto? Patient { get; set; }
    public int AppointmentId { get; set; }
    public AppointmentDto? Appointment { get; set; }
}