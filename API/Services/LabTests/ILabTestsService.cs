using Models;
using Models.DTOs.LabTests;

namespace API.Services.LabTests;

public interface ILabTestsService
{
    Task<LabTestResponseDto> GetTests();
    Task<LabTestResponseDto> GetTestById(int id);
    Task<LabTestResponseDto> CreateTest(UpsertLabTestDto test);
    Task<LabTestResponseDto> UpdateTest(int id, UpsertLabTestDto test);
    Task<LabTestResponseDto> DeleteTest(int id);
}