using Models;
using Models.DTOs.LabTests;

namespace API.Services.LabTests;

public interface ILabTestsService
{
    Task<GeneralResponse> GetTests();
    Task<GeneralResponse> GetTestById(int id);
    Task<GeneralResponse> CreateTest(UpsertLabTestDto test);
    Task<GeneralResponse> UpdateTest(int id, UpsertLabTestDto test);
    Task<GeneralResponse> DeleteTest(int id);
}