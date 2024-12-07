namespace Models.DTOs.DoctorSchedules;

public record DoctorScheduleDto(int Id, 
    DateTime StartDate, 
    DateTime EndDate, 
    DayOfWeek Day,
    int DoctorId
    );