using Models.DTOs.Patients;

namespace Models.DTOs.Diagnoses;

public class DiagnoseDetailsDto
{
    public int PatientId { get; set; }
    public string Diagnosis { get; set; } = string.Empty;
    public PatientDto? Patient { get; set; }
}