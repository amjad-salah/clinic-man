using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Prescriptions;
using Models.Entities;

namespace API.Services.Prescriptions;

public class PrescriptionsService(AppDbContext context) : IPrescriptionsService
{
    public async Task<PrescriptionResponseDto> GetPrescriptions()
    {
        var prescriptions = await context.Prescriptions.AsNoTracking()
            .Include(p => p.Appointment)
            .Include(p => p.Patient)
            .ProjectToType<PrescriptionDetailsDto>().ToListAsync();

        return new PrescriptionResponseDto { Success = true, Prescriptions = prescriptions };
    }

    public async Task<PrescriptionResponseDto> GetPrescription(int id)
    {
        var prescription = await context.Prescriptions.AsNoTracking()
            .Include(p => p.Appointment)
            .Include(p => p.Patient)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (prescription == null)
            return new PrescriptionResponseDto { Success = false, Error = "Prescription not found" };

        return new PrescriptionResponseDto { Success = true, Prescription = prescription.Adapt<PrescriptionDetailsDto>() };
    }

    public async Task<PrescriptionResponseDto> AddPrescription(UpsertPrescriptionDto prescription)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == prescription.AppointmentId);

        if (existAppointment == null)
            return new PrescriptionResponseDto { Success = false, Error = "Appointment Not Found" };

        var newPrescription = prescription.Adapt<Prescription>();
        newPrescription.PatientId = existAppointment.PatientId;

        context.Prescriptions.Add(newPrescription);
        await context.SaveChangesAsync();

        return new PrescriptionResponseDto { Success = true };
    }

    public async Task<PrescriptionResponseDto> UpdatePrescription(int id, UpsertPrescriptionDto prescription)
    {
        var existPrescription = await context.Prescriptions.FindAsync(id);

        if (existPrescription == null)
            return new PrescriptionResponseDto { Success = false, Error = "Prescription not found" };

        if (existPrescription.AppointmentId != prescription.AppointmentId)
        {
            var existAppointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == prescription.AppointmentId);

            if (existAppointment == null)
                return new PrescriptionResponseDto { Success = false, Error = "Appointment Not Found" };
            existPrescription.PatientId = existAppointment.PatientId;
            existPrescription.AppointmentId = existAppointment.Id;
        }

        existPrescription.MedicationName = prescription.MedicationName;
        existPrescription.Frequency = prescription.Frequency;
        existPrescription.Dosage = prescription.Dosage;
        existPrescription.Duration = prescription.Duration;

        await context.SaveChangesAsync();

        return new PrescriptionResponseDto { Success = true };
    }

    public async Task<PrescriptionResponseDto> DeletePrescription(int id)
    {
        var prescription = await context.Prescriptions.FindAsync(id);

        if (prescription == null)
            return new PrescriptionResponseDto { Success = false, Error = "Prescription not found" };

        context.Prescriptions.Remove(prescription);
        await context.SaveChangesAsync();

        return new PrescriptionResponseDto { Success = true };
    }
}