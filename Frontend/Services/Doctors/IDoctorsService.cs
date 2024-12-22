using Models.DTOs.Doctors;

namespace Frontend.Services.Doctors;

public interface IDoctorsService
{
    Task<DoctorResponseDto?> GetDoctors();
    Task<DoctorResponseDto> GetDoctorById(int id);
    Task<DoctorResponseDto> AddDoctor(UpsertDoctorDto doctor);
    Task<DoctorResponseDto> UpdateDoctor(int id, UpsertDoctorDto doctor);
    Task<DoctorResponseDto> DeleteDoctor(int id);
}