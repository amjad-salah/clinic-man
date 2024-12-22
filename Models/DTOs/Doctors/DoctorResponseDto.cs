namespace Models.DTOs.Doctors;

public class DoctorResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<DoctorDto>? Doctors { get; set; }
    public DoctorDetailsDto? Doctor { get; set; }
}