using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.DoctorSchedules;
using Models.Entities;

namespace API.Services.DoctorSchedules;

public class DoctorSchedulesService(AppDbContext context) : IDoctorSchedulesService
{
    public async Task<ScheduleResponseDto> GetSchedules()
    {
        var schedules = await context.DoctorSchedules
            .Include(s => s.Doctor)
            .ThenInclude(d => d!.User)
            .ProjectToType<DoctorScheduleDetailsDto>()
            .AsNoTracking().ToListAsync();

        return new ScheduleResponseDto { Success = true, Schedules = schedules };
    }

    public async Task<ScheduleResponseDto> GetScheduleById(int id)
    {
        var schedule = await context.DoctorSchedules
            .Include(s => s.Doctor)
            .ThenInclude(d => d!.User)
            .AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);

        return schedule == null
            ? new ScheduleResponseDto { Success = false, Error = "Schedule not found" }
            : new ScheduleResponseDto { Success = true, Schedule = schedule.Adapt<DoctorScheduleDetailsDto>() };
    }

    public async Task<ScheduleResponseDto> AddSchedule(UpsertDoctorScheduleDto scheduleDto)
    {
        var newSchedule = scheduleDto.Adapt<DoctorSchedule>();

        context.DoctorSchedules.Add(newSchedule);
        await context.SaveChangesAsync();

        return new ScheduleResponseDto { Success = true };
    }

    public async Task<ScheduleResponseDto> UpdateSchedule(int id, UpsertDoctorScheduleDto scheduleDto)
    {
        var schedule = await context.DoctorSchedules.FindAsync(id);

        if (schedule == null)
            return new ScheduleResponseDto { Success = false, Error = "Schedule not found" };

        schedule.DoctorId = scheduleDto.DoctorId;
        schedule.Day = scheduleDto.Day;
        schedule.StartTime = TimeOnly.Parse(scheduleDto.StartTime.ToString()!);
        schedule.EndTime = TimeOnly.Parse(scheduleDto.EndTime.ToString()!);

        await context.SaveChangesAsync();

        return new ScheduleResponseDto { Success = true };
    }

    public async Task<ScheduleResponseDto> DeleteSchedule(int id)
    {
        var schedule = await context.DoctorSchedules.FindAsync(id);

        if (schedule == null)
            return new ScheduleResponseDto { Success = false, Error = "Schedule not found" };

        context.DoctorSchedules.Remove(schedule);
        await context.SaveChangesAsync();

        return new ScheduleResponseDto { Success = true };
    }
}