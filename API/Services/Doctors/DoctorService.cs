using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Doctors;
using Models.Entities;

namespace API.Services.Doctors;

public class DoctorService(AppDbContext context) : IDoctorService
{
    public async Task<GeneralResponse> GetDoctors()
    {
        var doctors = await context.Doctors.AsNoTracking()
            .Include(d => d.User)
            .ProjectToType<DoctorDto>().ToListAsync();
        
        return new GeneralResponse() { Success = true, Data = doctors };
    }

    public async Task<GeneralResponse> GetDoctorById(int id)
    {
        var doctor = await context.Doctors.AsNoTracking()
            .Include(d => d.User)
            .Include((d => d.Schedules))
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (doctor == null)
            return new GeneralResponse() { Success = false, Error = "Doctor not found." };
        
        var doc = doctor.Adapt<DoctorDetailsDto>();
        
        return new GeneralResponse() { Success = true, Data = doc };
    }

    public async Task<GeneralResponse> AddDoctor(UpsertDoctorDto doctor)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(
            u => u.Id == doctor.UserId);
        
        var existDoc = await context.Doctors.AsNoTracking().FirstOrDefaultAsync(
            d => d.PhoneNo == doctor.PhoneNo || d.UserId == doctor.UserId);
        
        if (existDoc != null || user == null)
            return new GeneralResponse() { Success = false, 
                Error = "Doctor with this phone number already exist, or user not found." };

        var newDoc = doctor.Adapt<Doctor>();
        context.Doctors.Add(newDoc);
        await context.SaveChangesAsync();
        
        var doc = newDoc.Adapt<DoctorDto>();
        
        return new GeneralResponse() { Success = true, Data = doc };
    }

    public async Task<GeneralResponse> UpdateDoctor(int id, UpsertDoctorDto doctor)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(
            u => u.Id == doctor.UserId);
        
        var existDoc = await context.Doctors.FindAsync(id);
        
        if (existDoc == null)
            return new GeneralResponse() { Success = false, Error = "Doctor not found." };

        if (existDoc.PhoneNo != doctor.PhoneNo || existDoc.UserId != doctor.UserId)
        {
            var conflictDoc = await context.Doctors.AsNoTracking().FirstOrDefaultAsync(
                d => d.PhoneNo == doctor.PhoneNo || d.UserId == doctor.UserId);
            
            if (conflictDoc != null || user is not { Role: UserRole.Doctor })
                return new GeneralResponse() { Success = false, 
                    Error = "Doctor with this phone number already exist, or user not found." };
        }
        
        existDoc.PhoneNo = doctor.PhoneNo;
        existDoc.UserId = doctor.UserId;
        existDoc.Specialization = doctor.Specialization;
        await context.SaveChangesAsync();

        return new GeneralResponse() { Success = true };
    }

    public async Task<GeneralResponse> DeleteDoctor(int id)
    {
        var doctor = await context.Doctors.FindAsync(id);
        
        if (doctor == null)
            return new GeneralResponse() { Success = false, Error = "Doctor not found." };

        context.Doctors.Remove(doctor);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() { Success = true };
    }
}