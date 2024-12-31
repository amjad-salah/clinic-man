using Models;
using Models.DTOs.Appointments;

namespace API.Services.Appointments;

public interface IAppointmentsService
{
    Task<AppointmentResponseDto> GetAllAppointments();
    Task<AppointmentResponseDto> GetAppointmentById(int id);
    Task<AppointmentResponseDto> AddAppointment(UpsertAppointmentDto appointment);
    Task<AppointmentResponseDto> UpdateAppointment(int id, UpsertAppointmentDto appointment);
    Task<AppointmentResponseDto> DeleteAppointment(int id);
}