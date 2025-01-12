using API.Data;
using API.Services.Billings;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Appointments;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Payments;
using Models.Entities;

namespace API.Services.Appointments;

public class AppointmentsService(AppDbContext context, IBillingsService billingsService) : IAppointmentsService
{
    public async Task<AppointmentResponseDto> GetAllAppointments()
    {
        var appointments = await context.Appointments.OrderByDescending(a => a.Id)
            .AsNoTracking()
            .Include(a =>a.AppointmentType)
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ThenInclude(d => d!.User)
            .ProjectToType<AppointmentDto>()
            .ToListAsync();

        return new AppointmentResponseDto { Success = true, Appointments = appointments };
    }

    public async Task<AppointmentResponseDto> GetAppointmentById(int id)
    {
        var appointment = await context.Appointments.AsNoTracking()
            .Include(a =>a.AppointmentType)
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ThenInclude(d => d!.User)
            .Include(a => a.Diagnoses)
            .Include(a => a.Prescriptions)
            .Include(a => a.Tests)
            .FirstOrDefaultAsync(a => a.Id == id);

        return appointment == null
            ? new AppointmentResponseDto { Success = false, Error = "Appointment not found" }
            : new AppointmentResponseDto { Success = true, Appointment = appointment.Adapt<AppointmentDetailsDto>() };
    }

    public async Task<AppointmentResponseDto> AddAppointment(UpsertAppointmentDto appointment)
    {
        var response = await GetDoctorAndPatient(appointment);
        if (!response.Success) return response;

        var existType = await context.AppointmentTypes.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == appointment.AppointmentTypeId);

        if (existType == null)
            return new AppointmentResponseDto() { Success = false, Error = "Type not exist" };
        
        var newAppointment = appointment.Adapt<Appointment>();

        context.Appointments.Add(newAppointment);
        
        await context.SaveChangesAsync();

        var newBill = await billingsService.AddBilling(new UpsertBillingDto()
        {
            Date = DateOnly.FromDateTime(DateTime.Now),
            Tax = 0,
            AppointmentId = newAppointment.Id,
        });

        await billingsService.AddBillingItem(new UpsertBillingItemDto()
        {
            BillingId = newBill.Billing!.Id,
            Quantity = 1,
            UnitPrice = existType.Fees,
            Description = existType.Name
        });

        return new AppointmentResponseDto { Success = true };
    }

    public async Task<AppointmentResponseDto> UpdateAppointment(int id, UpsertAppointmentDto appointment)
    {
        var existingAppointment = await context.Appointments.FindAsync(id);

        if (existingAppointment == null)
            return new AppointmentResponseDto { Success = false, Error = "Appointment not found" };

        if (appointment.Status == AppointmentStatus.Completed)
        {
            var billing = await context.Billings.FirstAsync(b => b.AppointmentId == id);


            await billingsService.AddBillingPayment(new UpsertPaymentDto()
            {
                Amount = billing.Total,
                BillingId = billing.Id,
            });
        }

        existingAppointment.Status = appointment.Status;

        await context.SaveChangesAsync();

        return new AppointmentResponseDto { Success = true };
    }

    public async Task<AppointmentResponseDto> DeleteAppointment(int id)
    {
        var appointment = await context.Appointments.FindAsync(id);

        if (appointment == null)
            return new AppointmentResponseDto { Success = false, Error = "Appointment not found" };

        context.Appointments.Remove(appointment);
        await context.SaveChangesAsync();

        return new AppointmentResponseDto { Success = true };
    }

    private async Task<AppointmentResponseDto> GetDoctorAndPatient(UpsertAppointmentDto appointment)
    {
        var existDoctor = await context.Doctors.AsNoTracking()
            .Include(d => d.Schedules)
            .FirstOrDefaultAsync(d => d.Id == appointment.DoctorId);

        if (existDoctor == null)
            return new AppointmentResponseDto { Success = false, Error = "Doctor not found" };

        var dateDay = appointment.Date.DayOfWeek;

        foreach (var schedule in existDoctor.Schedules!)
        {
            if (schedule.Day == dateDay)
                if (appointment.Time >= schedule.StartTime && appointment.Time <= schedule.EndTime)
                    break;
                else
                    return new AppointmentResponseDto { Success = false, Error = "Doctor not available at this time" };
            return new AppointmentResponseDto { Success = false, Error = "Doctor not available on this day" };
        }

        var existPatient = await context.Patients.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == appointment.PatientId);

        return existPatient == null
            ? new AppointmentResponseDto { Success = false, Error = "Patient not found" }
            : new AppointmentResponseDto { Success = true };
    }
}