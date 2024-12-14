namespace Models.DTOs.Prescriptions;

public class PrescriptionDto
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string MedicationName { get; set; } = string.Empty;
    public string Dosage { get; set; } = string.Empty;
    public string Frequency { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public int AppointmentId { get; set; }
}