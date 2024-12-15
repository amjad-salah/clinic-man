using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.DoctorSchedules;
using Models.Entities;

namespace API.Services.DoctorSchedules;

public class DoctorSchedulesService(AppDbContext context) : IDoctorSchedulesService
{
    public async Task<GeneralResponse> GetSchedules()
    {
        var schedules = await context.DoctorSchedules
            .Include(s => s.Doctor)
            .ThenInclude(d => d!.User)
            .ProjectToType<DoctorScheduleDetailsDto>()
            .AsNoTracking().ToListAsync();

        return new GeneralResponse { Success = true, Data = schedules };
    }

    public async Task<GeneralResponse> GetScheduleById(int id)
    {
        var schedule = await context.DoctorSchedules
            .Include(s => s.Doctor)
            .ThenInclude(d => d!.User)
            .AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);

        return schedule == null
            ? new GeneralResponse { Success = false, Error = "Schedule not found" }
            : new GeneralResponse { Success = true, Data = schedule.Adapt<DoctorScheduleDetailsDto>() };
    }

    public async Task<GeneralResponse> AddSchedule(UpsertDoctorScheduleDto scheduleDto)
    {
        var newSchedule = scheduleDto.Adapt<DoctorSchedule>();

        context.DoctorSchedules.Add(newSchedule);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true, Data = new { newSchedule.Id } };
    }

    public async Task<GeneralResponse> UpdateSchedule(int id, UpsertDoctorScheduleDto scheduleDto)
    {
        var schedule = await context.DoctorSchedules.FindAsync(id);

        if (schedule == null)
            return new GeneralResponse { Success = false, Error = "Schedule not found" };

        schedule.DoctorId = scheduleDto.DoctorId;
        schedule.Day = scheduleDto.Day;
        schedule.StartTime = TimeOnly.Parse(scheduleDto.StartTime.ToString()!);
        schedule.EndTime = TimeOnly.Parse(scheduleDto.EndTime.ToString()!);

        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }

    public async Task<GeneralResponse> DeleteSchedule(int id)
    {
        var schedule = await context.DoctorSchedules.FindAsync(id);

        if (schedule == null)
            return new GeneralResponse { Success = false, Error = "Schedule not found" };

        context.DoctorSchedules.Remove(schedule);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }
}