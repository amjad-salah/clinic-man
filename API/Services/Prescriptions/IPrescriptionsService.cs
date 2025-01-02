using Models;
using Models.DTOs.Prescriptions;

namespace API.Services.Prescriptions;

public interface IPrescriptionsService
{
    Task<PrescriptionResponseDto> GetPrescriptions();
    Task<PrescriptionResponseDto> GetPrescription(int id);
    Task<PrescriptionResponseDto> AddPrescription(UpsertPrescriptionDto prescription);
    Task<PrescriptionResponseDto> UpdatePrescription(int id, UpsertPrescriptionDto prescription);
    Task<PrescriptionResponseDto> DeletePrescription(int id);
}