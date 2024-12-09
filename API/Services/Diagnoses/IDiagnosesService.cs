using Models;
using Models.DTOs.Diagnoses;

namespace API.Services.Diagnoses;

public interface IDiagnosesService
{
    Task<GeneralResponse> GetDiagnoses();
    Task<GeneralResponse> GetDiagnoseById(int id);
    Task<GeneralResponse> AddDiagnose(UpsertDiagnoseDto diagnose);
    Task<GeneralResponse> UpdateDiagnose(int id, UpsertDiagnoseDto diagnose);
    Task<GeneralResponse> DeleteDiagnose(int id);
}