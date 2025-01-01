using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Doctors;
using Models.Entities;

namespace API.Services.Doctors;

public class DoctorService(AppDbContext context) : IDoctorService
{
    public async Task<DoctorResponseDto> GetDoctors()
    {
        var doctors = await context.Doctors.AsNoTracking()
            .Include(d => d.User)
            .ProjectToType<DoctorDto>().ToListAsync();

        return new DoctorResponseDto { Success = true, Doctors = doctors };
    }

    public async Task<DoctorResponseDto> GetDoctorById(int id)
    {
        var doctor = await context.Doctors.AsNoTracking()
            .Include(d => d.User)
            .Include(d => d.Schedules)
            .Include(d => d.Appointments)!
            .ThenInclude(a => a.Patient)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (doctor == null)
            return new DoctorResponseDto { Success = false, Error = "Doctor not found." };

        var doc = doctor.Adapt<DoctorDetailsDto>();

        return new DoctorResponseDto { Success = true, Doctor = doc };
    }

    public async Task<DoctorResponseDto> AddDoctor(UpsertDoctorDto doctor)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(
            u => u.Id == doctor.UserId);

        var existDoc = await context.Doctors.AsNoTracking().FirstOrDefaultAsync(
            d => d.PhoneNo == doctor.PhoneNo || d.UserId == doctor.UserId);

        if (existDoc != null || user == null)
            return new DoctorResponseDto
            {
                Success = false,
                Error = "Doctor with this phone number already exist, or user not found."
            };

        var newDoc = doctor.Adapt<Doctor>();
        context.Doctors.Add(newDoc);
        await context.SaveChangesAsync();

        var doc = newDoc.Adapt<DoctorDetailsDto>();

        return new DoctorResponseDto { Success = true, Doctor = doc };
    }

    public async Task<DoctorResponseDto> UpdateDoctor(int id, UpsertDoctorDto doctor)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(
            u => u.Id == doctor.UserId);

        var existDoc = await context.Doctors.FindAsync(id);

        if (existDoc == null || user == null)
            return new DoctorResponseDto { Success = false, Error = "Doctor not found, or user not found." };

        if (existDoc.PhoneNo != doctor.PhoneNo || existDoc.UserId != doctor.UserId)
        {
            var conflictDoc = await context.Doctors.AsNoTracking().FirstOrDefaultAsync(
                d => d.PhoneNo == doctor.PhoneNo);

            if (conflictDoc != null || user is not { Role: UserRole.Doctor })
                return new DoctorResponseDto
                {
                    Success = false,
                    Error = "Doctor with this phone number already exist, or user not found."
                };
        }

        existDoc.PhoneNo = doctor.PhoneNo;
        existDoc.UserId = doctor.UserId;
        existDoc.Specialization = doctor.Specialization;
        await context.SaveChangesAsync();

        return new DoctorResponseDto { Success = true };
    }

    public async Task<DoctorResponseDto> DeleteDoctor(int id)
    {
        var doctor = await context.Doctors.FindAsync(id);

        if (doctor == null)
            return new DoctorResponseDto { Success = false, Error = "Doctor not found." };

        context.Doctors.Remove(doctor);
        await context.SaveChangesAsync();

        return new DoctorResponseDto { Success = true };
    }
}