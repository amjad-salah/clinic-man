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
        var diagnoses = await context.Diagnoses.AsNoTracking().ToListAsync();
        
        return new GeneralResponse() {Success = true, Data = diagnoses};
    }

    public async Task<GeneralResponse> GetDiagnoseById(int id)
    {
        var diagnose = await context.Diagnoses.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (diagnose == null)
            return new GeneralResponse() {Success = false, Error = "Diagnoses Not Found"};
        
        return new GeneralResponse() {Success = true, Data = diagnose};
    }

    public async Task<GeneralResponse> AddDiagnose(UpsertDiagnoseDto diagnose)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == diagnose.AppointmentId);
        
        if (existAppointment == null)
            return new GeneralResponse() {Success = false, Error = "Appointment Not Found"};
        
        context.Diagnoses.Add(diagnose.Adapt<Diagnose>());
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true, Data = diagnose};
    }

    public async Task<GeneralResponse> UpdateDiagnose(int id, UpsertDiagnoseDto diagnose)
    {
        var existDiagnose = await context.Diagnoses.FindAsync(id);
        
        if (existDiagnose == null)
            return new GeneralResponse() {Success = false, Error = "Diagnoses Not Found"};
        
        existDiagnose.AppointmentId = diagnose.AppointmentId;
        existDiagnose.Diagnosis = diagnose.Diagnosis;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> DeleteDiagnose(int id)
    {
        var diagnose = await context.Diagnoses.FindAsync(id);
        
        if (diagnose == null)
            return new GeneralResponse() {Success = false, Error = "Diagnoses Not Found"};
        
        context.Diagnoses.Remove(diagnose);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
}