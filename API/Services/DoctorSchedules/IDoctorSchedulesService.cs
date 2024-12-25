using Models;
using Models.DTOs.DoctorSchedules;

namespace API.Services.DoctorSchedules;

public interface IDoctorSchedulesService
{
    Task<ScheduleResponseDto> GetSchedules();
    Task<ScheduleResponseDto> GetScheduleById(int id);
    Task<ScheduleResponseDto> AddSchedule(UpsertDoctorScheduleDto scheduleDto);
    Task<ScheduleResponseDto> UpdateSchedule(int id, UpsertDoctorScheduleDto scheduleDto);
    Task<ScheduleResponseDto> DeleteSchedule(int id);
}