using Models.DTOs.Doctors;

namespace Models.DTOs.DoctorSchedules;

public record DoctorScheduleDetailsDto(int Id, 
    DateTime StartDate, 
    DateTime EndDate, 
    DayOfWeek Day,
    DoctorDetailsDto Doctor);