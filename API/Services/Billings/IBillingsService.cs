using Models;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Payments;

namespace API.Services.Billings;

public interface IBillingsService
{
    Task<BillingResponseDto> GetBillings();
    Task<BillingResponseDto> GetBillingById(int id);
    Task<BillingResponseDto> AddBilling(UpsertBillingDto billing);
    // Task<BillingResponseDto> UpdateBilling(int id, UpsertBillingDto billing);
    Task<BillingResponseDto> DeleteBilling(int id);
    Task<BillingResponseDto> AddBillingItem(UpsertBillingItemDto item);
    Task<BillingResponseDto> DeleteItem(int id);
    Task<BillingResponseDto> AddBillingPayment(UpsertPaymentDto payment);
    Task<BillingResponseDto> DeletePayment(int id);
}