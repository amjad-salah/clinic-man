namespace Models.DTOs.AppointmentTypes;

public class AppointmentTypeResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public AppointmentTypeDetailsDto? AppointmentType { get; set; }
    public List<AppointmentTypeDto>? AppointmentTypes { get; set; }
}