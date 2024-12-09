using Models;
using Models.DTOs.Appointments;

namespace API.Services.Appointments;

public interface IAppointmentsService
{
    Task<GeneralResponse> GetAllAppointments();
    Task<GeneralResponse> GetAppointmentById(int id);
    Task<GeneralResponse> AddAppointment(UpsertAppointmentDto appointment);
    Task<GeneralResponse> UpdateAppointment(int id, UpsertAppointmentDto appointment);
    Task<GeneralResponse> DeleteAppointment(int id);
}