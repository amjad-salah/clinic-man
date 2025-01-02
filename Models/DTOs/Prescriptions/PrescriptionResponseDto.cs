namespace Models.DTOs.Prescriptions;

public class PrescriptionResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<PrescriptionDetailsDto>? Prescriptions { get; set; }
    public PrescriptionDetailsDto? Prescription { get; set; }
}