namespace Models.DTOs.Diagnoses;

public class DiganoseResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<DiagnoseDetailsDto>? Diagnoses { get; set; }
    public DiagnoseDetailsDto? Diagnose { get; set; }
}