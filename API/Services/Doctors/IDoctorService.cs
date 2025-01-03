using Models;
using Models.DTOs.Doctors;

namespace API.Services.Doctors;

public interface IDoctorService
{
    Task<DoctorResponseDto> GetDoctors();
    Task<DoctorResponseDto> GetDoctorById(int id);
    Task<DoctorResponseDto> AddDoctor(UpsertDoctorDto doctor);
    Task<DoctorResponseDto> UpdateDoctor(int id, UpsertDoctorDto doctor);
    Task<DoctorResponseDto> DeleteDoctor(int id);
}