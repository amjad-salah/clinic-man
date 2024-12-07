using Models;
using Models.DTOs.DoctorSchedules;

namespace API.Services.DoctorSchedules;

public interface IDoctorSchedulesService
{
    Task<GeneralResponse> GetSchedules();
    Task<GeneralResponse> GetScheduleById(int id);
    Task<GeneralResponse> AddSchedule(UpsertDoctorScheduleDto scheduleDto);
    Task<GeneralResponse> UpdateSchedule(int id, UpsertDoctorScheduleDto scheduleDto);
    Task<GeneralResponse> DeleteSchedule(int id);
}