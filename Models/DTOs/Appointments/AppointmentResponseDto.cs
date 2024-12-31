namespace Models.DTOs.Appointments;

public class AppointmentResponseDto
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public List<AppointmentDto>? Appointments { get; set; }
    public AppointmentDetailsDto? Appointment { get; set; }
}