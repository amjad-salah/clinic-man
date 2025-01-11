using Models;
using Models.DTOs.AppointmentTypes;

namespace API.Services.AppointmentTypes;

public interface IAppointmentTypesService
{
    Task<AppointmentTypeResponseDto> GetAllAppointmentTypes();
    Task<AppointmentTypeResponseDto> GetAppointmentTypeById(int id);
    Task<AppointmentTypeResponseDto> AddAppointmentType(UpsertAppointmentTypeDto appointment);
    Task<AppointmentTypeResponseDto> UpdateAppointmentType(int id, UpsertAppointmentTypeDto appointment);
    Task<AppointmentTypeResponseDto> DeleteAppointmentType(int id);
}