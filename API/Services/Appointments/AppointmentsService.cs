using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Appointments;
using Models.DTOs.Patients;
using Models.Entities;

namespace API.Services.Appointments;

public class AppointmentsService(AppDbContext context) : IAppointmentsService
{
    public async Task<GeneralResponse> GetAllAppointments()
    {
        var appointments = await context.Appointments.AsNoTracking()
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ThenInclude(d => d!.User)
            .ProjectToType<AppointmentDto>()
            .ToListAsync();
        
        return new GeneralResponse() {Success = true, Data = appointments};
    }

    public async Task<GeneralResponse> GetAppointmentById(int id)
    {
        var appointment = await context.Appointments.AsNoTracking()
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ThenInclude(d => d!.User)
            .FirstOrDefaultAsync(a => a.Id == id);
        
        return appointment == null ? new GeneralResponse() {Success = false, Error = "Appointment not found"} 
            : new GeneralResponse() {Success = true, Data = appointment.Adapt<AppointmentDto>()};
    }

    public async Task<GeneralResponse> AddAppointment(UpsertAppointmentDto appointment)
    {
        var existDoctor = await context.Doctors.AsNoTracking()
            .Include(d => d.Schedules)
            .FirstOrDefaultAsync(d => d.Id == appointment.DoctorId);
        
        var response = await GetDoctorAndPatient(appointment);
        if (!response.Success) return response;
        
        var newAppointment = appointment.Adapt<Appointment>();
        
        context.Appointments.Add(newAppointment);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true, Data = newAppointment.Adapt<AppointmentDto>()};
    }

    public async Task<GeneralResponse> UpdateAppointment(int id, UpsertAppointmentDto appointment)
    {
        var existingAppointment = await context.Appointments.FindAsync(id);
        
        if (existingAppointment == null)
            return new GeneralResponse() {Success = false, Error = "Appointment not found"};

        var response = await GetDoctorAndPatient(appointment);
        if (!response.Success) return response;

        existingAppointment.Date = appointment.Date;
        existingAppointment.Time = appointment.Time;
        existingAppointment.DoctorId = appointment.DoctorId;
        existingAppointment.DoctorId = appointment.DoctorId;
        existingAppointment.Reason = appointment.Reason;
        existingAppointment.Status = appointment.Status;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
   
    public async Task<GeneralResponse> DeleteAppointment(int id)
    {
        var appointment = await context.Appointments.FindAsync(id);
        
        if (appointment == null)
            return new GeneralResponse() {Success = false, Error = "Appointment not found"};
        
        context.Appointments.Remove(appointment);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
    
    private async Task<GeneralResponse> GetDoctorAndPatient(UpsertAppointmentDto appointment)
    {
        var existDoctor = await context.Doctors.AsNoTracking()
            .Include(d => d.Schedules)
            .FirstOrDefaultAsync(d => d.Id == appointment.DoctorId);
        
        if (existDoctor == null)
            return new GeneralResponse() {Success = false, Error = "Doctor not found"};
        
        var dateDay = appointment.Date.Day;

        foreach (var schedule in existDoctor.Schedules!)
        {
            if ((int)schedule.Day == dateDay)
                if (appointment.Time >= schedule.StartTime && appointment.Time <= schedule.EndTime)
                    break;
                else
                    return new GeneralResponse() {Success = false, Error = "Doctor not available at this time"};
            return new GeneralResponse() {Success = false, Error = "Doctor not available on this day"};
        }
        
        var existPatient = await context.Patients.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == appointment.PatientId);
        
        return existPatient == null ? new GeneralResponse() {Success = false, Error = "Patient not found"} : new GeneralResponse() {Success = true};
    }

}