using Models;
using Models.DTOs.Patients;

namespace API.Services.Patients;

public interface IPatientsService
{
    Task<GeneralResponse> GetPatients();
    Task<GeneralResponse> GetPatientById(int id);
    Task<GeneralResponse> CreatePatient(UpsertPatientDto patient);
    Task<GeneralResponse> UpdatePatient(int id, UpsertPatientDto patient);
    Task<GeneralResponse> DeletePatient(int id);
}