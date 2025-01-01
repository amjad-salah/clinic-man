using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Diagnoses;
using Models.Entities;

namespace API.Services.Diagnoses;

public class DiagnosesService(AppDbContext context) : IDiagnosesService
{
    public async Task<DiganoseResponseDto> GetDiagnoses()
    {
        var diagnoses = await context.Diagnoses.AsNoTracking()
            .Include(d => d.Appointment)
            .Include(d => d.Patient)
            .ProjectToType<DiagnoseDetailsDto>()
            .ToListAsync();

        return new DiganoseResponseDto { Success = true, Diagnoses = diagnoses };
    }

    public async Task<DiganoseResponseDto> GetDiagnoseById(int id)
    {
        var diagnose = await context.Diagnoses.AsNoTracking()
            .Include(d => d.Appointment)
            .Include(d => d.Patient)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (diagnose == null)
            return new DiganoseResponseDto { Success = false, Error = "Diagnoses Not Found" };

        return new DiganoseResponseDto { Success = true, Diagnose = diagnose.Adapt<DiagnoseDetailsDto>() };
    }

    public async Task<DiganoseResponseDto> AddDiagnose(UpsertDiagnoseDto diagnose)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == diagnose.AppointmentId);

        if (existAppointment == null)
            return new DiganoseResponseDto { Success = false, Error = "Appointment Not Found" };

        var newDiagnose = diagnose.Adapt<Diagnose>();
        newDiagnose.PatientId = existAppointment.PatientId;

        context.Diagnoses.Add(newDiagnose);
        await context.SaveChangesAsync();

        return new DiganoseResponseDto { Success = true };
    }

    public async Task<DiganoseResponseDto> UpdateDiagnose(int id, UpsertDiagnoseDto diagnose)
    {
        var existDiagnose = await context.Diagnoses.FindAsync(id);

        if (existDiagnose == null)
            return new DiganoseResponseDto { Success = false, Error = "Diagnoses Not Found" };

        if (existDiagnose.AppointmentId != diagnose.AppointmentId)
        {
            var existAppointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == diagnose.AppointmentId);

            if (existAppointment == null)
                return new DiganoseResponseDto { Success = false, Error = "Appointment Not Found" };

            existDiagnose.PatientId = existAppointment.PatientId;
            existDiagnose.AppointmentId = existAppointment.Id;
        }

        existDiagnose.Diagnosis = diagnose.Diagnosis;

        await context.SaveChangesAsync();

        return new DiganoseResponseDto { Success = true };
    }

    public async Task<DiganoseResponseDto> DeleteDiagnose(int id)
    {
        var diagnose = await context.Diagnoses.FindAsync(id);

        if (diagnose == null)
            return new DiganoseResponseDto { Success = false, Error = "Diagnoses Not Found" };

        context.Diagnoses.Remove(diagnose);
        await context.SaveChangesAsync();

        return new DiganoseResponseDto { Success = true };
    }
}