namespace Models.DTOs.Diagnoses;

public class DiagnoseDto
{
    public int AppointmentId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
}