using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Prescriptions;
using Models.Entities;

namespace API.Services.Prescriptions;

public class PrescriptionsService(AppDbContext context) : IPrescriptionsService
{
    public async Task<GeneralResponse> GetPrescriptions()
    {
        var prescriptions = await context.Prescriptions.AsNoTracking()
            .Include(p => p.AppointmentId)
            .Include(p =>p.Patient)
            .ProjectToType<PrescriptionDetailsDto>().ToListAsync();
        
        return new GeneralResponse() {Success = true, Data = prescriptions};
    }

    public async Task<GeneralResponse> GetPrescription(int id)
    {
        var prescription = await context.Prescriptions.AsNoTracking()
            .Include(p => p.AppointmentId)
            .Include(p =>p.Patient)
            .FirstOrDefaultAsync(p => p.Id == id);
        
        if (prescription == null)
            return new GeneralResponse() {Success = false, Error = "Prescription not found"};
        
        return new GeneralResponse() {Success = true, Data = prescription.Adapt<PrescriptionDetailsDto>()};
    }

    public async Task<GeneralResponse> AddPrescription(UpsertPrescriptionDto prescription)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == prescription.AppointmentId);
        
        if (existAppointment == null)
            return new GeneralResponse() {Success = false, Error = "Appointment Not Found"};

        var newPrescription = prescription.Adapt<Prescription>();
        newPrescription.PatientId = existAppointment.PatientId;
        
        context.Prescriptions.Add(newPrescription);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true, Data = prescription};
    }

    public async Task<GeneralResponse> UpdatePrescription(int id, UpsertPrescriptionDto prescription)
    {
        var existPrescription = await context.Prescriptions.FindAsync(id);
        
        if (existPrescription == null)
            return new GeneralResponse() {Success = false, Error = "Prescription not found"};

        if (existPrescription.AppointmentId != prescription.AppointmentId)
        {
            var existAppointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == prescription.AppointmentId);
        
            if (existAppointment == null)
                return new GeneralResponse() {Success = false, Error = "Appointment Not Found"};
        }
        
        existPrescription.PatientId = prescription.PatientId;
        existPrescription.AppointmentId = prescription.AppointmentId;
        existPrescription.MedicationName = prescription.MedicationName;
        existPrescription.Frequency = prescription.Frequency;
        existPrescription.Dosage = prescription.Dosage;
        existPrescription.Duration = prescription.Duration;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> DeletePrescription(int id)
    {
        var prescription = await context.Prescriptions.FindAsync(id);
        
        if (prescription == null)
            return new GeneralResponse() {Success = false, Error = "Prescription not found"};
        
        context.Prescriptions.Remove(prescription);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
}