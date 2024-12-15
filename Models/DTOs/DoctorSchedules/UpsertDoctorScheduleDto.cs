namespace Models.DTOs.DoctorSchedules;

public record UpsertDoctorScheduleDto(
    TimeOnly StartTime,
    TimeOnly EndTime,
    DayOfWeek Day,
    int DoctorId);