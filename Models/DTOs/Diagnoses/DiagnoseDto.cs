namespace Models.DTOs.Diagnoses;

public class DiagnoseDto
{
    public int PatientId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
    public int AppointmentId { get; set; }
}