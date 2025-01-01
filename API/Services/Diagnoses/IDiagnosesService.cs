using Models;
using Models.DTOs.Diagnoses;

namespace API.Services.Diagnoses;

public interface IDiagnosesService
{
    Task<DiganoseResponseDto> GetDiagnoses();
    Task<DiganoseResponseDto> GetDiagnoseById(int id);
    Task<DiganoseResponseDto> AddDiagnose(UpsertDiagnoseDto diagnose);
    Task<DiganoseResponseDto> UpdateDiagnose(int id, UpsertDiagnoseDto diagnose);
    Task<DiganoseResponseDto> DeleteDiagnose(int id);
}