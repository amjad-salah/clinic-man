using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models.DTOs.Appointments;
using Models.DTOs.AppointmentTypes;
using Models.Entities;

namespace API.Services.AppointmentTypes;

public class AppointmentTypesService(AppDbContext context) : IAppointmentTypesService
{
    public async Task<AppointmentTypeResponseDto> GetAllAppointmentTypes()
    {
        var types = await context.AppointmentTypes
            .AsNoTracking()
            .ProjectToType<AppointmentTypeDto>()
            .ToListAsync();

        return new AppointmentTypeResponseDto { Success = true, AppointmentTypes = types };
    }

    public async Task<AppointmentTypeResponseDto> GetAppointmentTypeById(int id)
    {
        var appointment = await context.AppointmentTypes.AsNoTracking()
            .Include(t =>t.Appointments)
            .FirstOrDefaultAsync(a => a.Id == id);

        return appointment == null
            ? new AppointmentTypeResponseDto { Success = false, Error = "Appointment not found" }
            : new AppointmentTypeResponseDto { Success = true, AppointmentType = appointment.Adapt<AppointmentTypeDetailsDto>() };
    }

    public async Task<AppointmentTypeResponseDto> AddAppointmentType(UpsertAppointmentTypeDto type)
    {

        var newType = type.Adapt<AppointmentType>();

        context.AppointmentTypes.Add(newType);
        await context.SaveChangesAsync();

        return new AppointmentTypeResponseDto { Success = true };
    }

    public async Task<AppointmentTypeResponseDto> UpdateAppointmentType(int id, UpsertAppointmentTypeDto type)
    {
        var existingType = await context.AppointmentTypes.FindAsync(id);

        if (existingType == null)
            return new AppointmentTypeResponseDto { Success = false, Error = "Appointment not found" };

        existingType.Name = type.Name;
        existingType.Fees = type.Fees;

        await context.SaveChangesAsync();

        return new AppointmentTypeResponseDto { Success = true };
    }

    public async Task<AppointmentTypeResponseDto> DeleteAppointmentType(int id)
    {
        var type = await context.AppointmentTypes.FindAsync(id);

        if (type == null)
            return new AppointmentTypeResponseDto { Success = false, Error = "Appointment not found" };

        context.AppointmentTypes.Remove(type);
        await context.SaveChangesAsync();

        return new AppointmentTypeResponseDto { Success = true };
    }
}