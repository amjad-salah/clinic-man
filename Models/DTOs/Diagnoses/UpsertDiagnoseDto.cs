namespace Models.DTOs.Diagnoses;

public class UpsertDiagnoseDto
{
    public int PatientId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
}