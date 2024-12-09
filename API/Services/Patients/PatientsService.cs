using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Patients;
using Models.Entities;

namespace API.Services.Patients;

public class PatientsService(AppDbContext context) : IPatientsService
{
    public async Task<GeneralResponse> GetPatients()
    {
        var patients = await context.Patients.AsNoTracking()
            .ProjectToType<PatientDto>()
            .ToListAsync();
        
        return new GeneralResponse() { Success = true, Data = patients };
    }

    public async Task<GeneralResponse> GetPatientById(int id)
    {
        var patient = await context.Patients.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
        
        return patient == null ? new GeneralResponse() {Success = false, Error = "Patient not found"} 
            : new GeneralResponse() { Success = true, Data = patient.Adapt<PatientDetailsDto>() };
    }

    public async Task<GeneralResponse> CreatePatient(UpsertPatientDto patient)
    {
        var existingPatient = await context.Patients.AsNoTracking().FirstOrDefaultAsync(
            p => p.PhoneNo == patient.PhoneNo);
        
        if (existingPatient != null)
            return new GeneralResponse() { Success = false, 
                Error = "Patient with this phone number already exists" };
        
        context.Patients.Add(patient.Adapt<Patient>());
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true, Data = patient.Adapt<PatientDto>() };
    }

    public async Task<GeneralResponse> UpdatePatient(int id, UpsertPatientDto patient)
    {
        var existingPatient = await context.Patients.FindAsync(id);
        
        if (existingPatient == null)
            return new GeneralResponse() { Success = false, Error = "Patient not found" };

        if (existingPatient.PhoneNo != patient.PhoneNo)
        {
            var existingPhone = await context.Patients.AsNoTracking()
                .FirstOrDefaultAsync(p => p.PhoneNo == patient.PhoneNo);
            
            if (existingPhone != null)
                return new GeneralResponse() { Success = false, 
                    Error = "Patient with this phone number already exists" };
        }
        
        existingPatient.PhoneNo = patient.PhoneNo;
        existingPatient.Address = patient.Address;
        existingPatient.Allergies = patient.Allergies;
        existingPatient.Email = patient.Email;
        existingPatient.Gender = patient.Gender;
        existingPatient.DoB = patient.DoB;
        existingPatient.FullName = patient.FullName;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true };
    }

    public async Task<GeneralResponse> DeletePatient(int id)
    {
        var patient = await context.Patients.FindAsync(id);
        
        if (patient == null)
            return new GeneralResponse() { Success = false, Error = "Patient not found" };
        
        context.Patients.Remove(patient);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true };
    }
}