using Models;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Payments;

namespace API.Services.Billings;

public interface IBillingsService
{
    Task<GeneralResponse> GetBillings();
    Task<GeneralResponse> GetBillingById(int id);
    Task<GeneralResponse> AddBilling(UpsertBillingDto billing);
    Task<GeneralResponse> UpdateBilling(int id, UpsertBillingDto billing);
    Task<GeneralResponse> DeleteBilling(int id);
    Task<GeneralResponse> AddBillingItem(int id, UpsertBillingItemDto item);
    Task<GeneralResponse> DeleteItem(int id);
    Task<GeneralResponse> AddBillingPayment(int id, UpsertPaymentDto payment);
    Task<GeneralResponse> DeletePayment(int id);
}