using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Patients;
using Models.Entities;

namespace API.Services.Patients;

public class PatientsService(AppDbContext context) : IPatientsService
{
    public async Task<PatientResponseDto> GetPatients()
    {
        var patients = await context.Patients.AsNoTracking()
            .ProjectToType<PatientDto>()
            .ToListAsync();

        return new PatientResponseDto { Success = true, Patients = patients };
    }

    public async Task<PatientResponseDto> GetPatientById(int id)
    {
        var patient = await context.Patients.AsNoTracking()
            .Include(p => p.Appointments)!
            .ThenInclude(a =>a.Doctor)
            .ThenInclude(d => d!.User)
            .Include(p => p.Diagnoses)
            .FirstOrDefaultAsync(p => p.Id == id);

        return patient == null
            ? new PatientResponseDto { Success = false, Error = "Patient not found" }
            : new PatientResponseDto { Success = true, Patient = patient.Adapt<PatientDetailsDto>() };
    }

    public async Task<PatientResponseDto> CreatePatient(UpsertPatientDto patient)
    {
        var existingPatient = await context.Patients.AsNoTracking().FirstOrDefaultAsync(
            p => p.PhoneNo == patient.PhoneNo);

        if (existingPatient != null)
            return new PatientResponseDto
            {
                Success = false,
                Error = "Patient with this phone number already exists"
            };

        context.Patients.Add(patient.Adapt<Patient>());
        await context.SaveChangesAsync();

        return new PatientResponseDto { Success = true };
    }

    public async Task<PatientResponseDto> UpdatePatient(int id, UpsertPatientDto patient)
    {
        var existingPatient = await context.Patients.FindAsync(id);

        if (existingPatient == null)
            return new PatientResponseDto { Success = false, Error = "Patient not found" };

        if (existingPatient.PhoneNo != patient.PhoneNo)
        {
            var existingPhone = await context.Patients.AsNoTracking()
                .FirstOrDefaultAsync(p => p.PhoneNo == patient.PhoneNo);

            if (existingPhone != null)
                return new PatientResponseDto
                {
                    Success = false,
                    Error = "Patient with this phone number already exists"
                };
        }

        existingPatient.PhoneNo = patient.PhoneNo;
        existingPatient.Address = patient.Address;
        existingPatient.Allergies = patient.Allergies;
        existingPatient.Email = patient.Email;
        existingPatient.Gender = patient.Gender;
        existingPatient.DoB = patient.DoB;
        existingPatient.FullName = patient.FullName;

        await context.SaveChangesAsync();

        return new PatientResponseDto { Success = true };
    }

    public async Task<PatientResponseDto> DeletePatient(int id)
    {
        var patient = await context.Patients.FindAsync(id);

        if (patient == null)
            return new PatientResponseDto { Success = false, Error = "Patient not found" };

        context.Patients.Remove(patient);
        await context.SaveChangesAsync();

        return new PatientResponseDto { Success = true };
    }
}