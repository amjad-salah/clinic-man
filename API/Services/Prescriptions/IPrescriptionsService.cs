using Models;
using Models.DTOs.Prescriptions;

namespace API.Services.Prescriptions;

public interface IPrescriptionsService
{
    Task<GeneralResponse> GetPrescriptions();
    Task<GeneralResponse> GetPrescription(int id);
    Task<GeneralResponse> AddPrescription(UpsertPrescriptionDto prescription);
    Task<GeneralResponse> UpdatePrescription(int id, UpsertPrescriptionDto prescription);
    Task<GeneralResponse> DeletePrescription(int id);
}