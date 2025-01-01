namespace Models.DTOs.LabTests;

public class LabTestResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<LabTestDetailsDto>? Tests { get; set; }
    public LabTestDetailsDto? Test { get; set; }
}