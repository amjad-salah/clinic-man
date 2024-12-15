using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Diagnoses;
using Models.Entities;

namespace API.Services.Diagnoses;

public class DiagnosesService(AppDbContext context) : IDiagnosesService
{
    public async Task<GeneralResponse> GetDiagnoses()
    {
        var diagnoses = await context.Diagnoses.AsNoTracking()
            .Include(d => d.Appointment)
            .Include(d => d.Patient)
            .ProjectToType<DiagnoseDetailsDto>()
            .ToListAsync();

        return new GeneralResponse { Success = true, Data = diagnoses };
    }

    public async Task<GeneralResponse> GetDiagnoseById(int id)
    {
        var diagnose = await context.Diagnoses.AsNoTracking()
            .Include(d => d.Appointment)
            .Include(d => d.Patient)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (diagnose == null)
            return new GeneralResponse { Success = false, Error = "Diagnoses Not Found" };

        return new GeneralResponse { Success = true, Data = diagnose.Adapt<DiagnoseDetailsDto>() };
    }

    public async Task<GeneralResponse> AddDiagnose(UpsertDiagnoseDto diagnose)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == diagnose.AppointmentId);

        if (existAppointment == null)
            return new GeneralResponse { Success = false, Error = "Appointment Not Found" };

        var newDiagnose = diagnose.Adapt<Diagnose>();
        newDiagnose.PatientId = existAppointment.PatientId;

        context.Diagnoses.Add(newDiagnose);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true, Data = diagnose };
    }

    public async Task<GeneralResponse> UpdateDiagnose(int id, UpsertDiagnoseDto diagnose)
    {
        var existDiagnose = await context.Diagnoses.FindAsync(id);

        if (existDiagnose == null)
            return new GeneralResponse { Success = false, Error = "Diagnoses Not Found" };

        if (existDiagnose.AppointmentId != diagnose.AppointmentId)
        {
            var existAppointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == diagnose.AppointmentId);

            if (existAppointment == null)
                return new GeneralResponse { Success = false, Error = "Appointment Not Found" };

            existDiagnose.PatientId = existAppointment.PatientId;
            existDiagnose.AppointmentId = existAppointment.Id;
        }

        existDiagnose.Diagnosis = diagnose.Diagnosis;

        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }

    public async Task<GeneralResponse> DeleteDiagnose(int id)
    {
        var diagnose = await context.Diagnoses.FindAsync(id);

        if (diagnose == null)
            return new GeneralResponse { Success = false, Error = "Diagnoses Not Found" };

        context.Diagnoses.Remove(diagnose);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }
}