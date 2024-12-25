namespace Models.DTOs.DoctorSchedules;

public class ScheduleResponseDto
{
    public bool Success { get; set; }
    public string Error { get; set; }
    public List<DoctorScheduleDetailsDto>? Schedules { get; set; }
    public DoctorScheduleDetailsDto Schedule { get; set; }
}