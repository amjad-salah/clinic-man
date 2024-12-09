namespace Models.DTOs.Diagnoses;

public class UpsertDiagnoseDto
{
    public int AppointmentId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
}