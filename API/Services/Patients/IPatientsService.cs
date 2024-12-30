using Models;
using Models.DTOs.Patients;

namespace API.Services.Patients;

public interface IPatientsService
{
    Task<PatientResponseDto> GetPatients();
    Task<PatientResponseDto> GetPatientById(int id);
    Task<PatientResponseDto> CreatePatient(UpsertPatientDto patient);
    Task<PatientResponseDto> UpdatePatient(int id, UpsertPatientDto patient);
    Task<PatientResponseDto> DeletePatient(int id);
}