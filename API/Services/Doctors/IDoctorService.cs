using Models;
using Models.DTOs.Doctors;

namespace API.Services.Doctors;

public interface IDoctorService
{
    Task<GeneralResponse> GetDoctors();
    Task<GeneralResponse> GetDoctorById(int id);
    Task<GeneralResponse> AddDoctor(UpsertDoctorDto doctor);
    Task<GeneralResponse> UpdateDoctor(int id, UpsertDoctorDto doctor);
    Task<GeneralResponse> DeleteDoctor(int id);
}