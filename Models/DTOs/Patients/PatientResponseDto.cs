namespace Models.DTOs.Patients;

public class PatientResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<PatientDto>? Patients { get; set; }
    public PatientDetailsDto Patient { get; set; }
}