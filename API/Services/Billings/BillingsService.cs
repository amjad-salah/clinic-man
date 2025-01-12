using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Payments;
using Models.Entities;

namespace API.Services.Billings;

public class BillingsService(AppDbContext context) : IBillingsService
{
    public async Task<BillingResponseDto> GetBillings()
    {
        var billings = await context.Billings.OrderByDescending(b => b.Id)
            .AsNoTracking()
            .Include(b => b.Appointment)
            .Include(b => b.Patient)
            .ProjectToType<BillingDto>()
            .ToListAsync();

        return new BillingResponseDto { Success = true, Billings = billings };
    }

    public async Task<BillingResponseDto> GetBillingById(int id)
    {
        var billing = await context.Billings.AsNoTracking()
            .Include(b => b.Appointment)
            .Include(b => b.Patient)
            .Include(b => b.Payments)
            .Include(b => b.BillItems)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (billing == null)
            return new BillingResponseDto { Success = false, Error = "Billing not found" };

        return new BillingResponseDto { Success = true, Billing = billing.Adapt<BillingDetailsDto>() };
    }

    public async Task<BillingResponseDto> AddBilling(UpsertBillingDto billing)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == billing.AppointmentId);

        if (existAppointment == null)
            return new BillingResponseDto { Success = false, Error = "Appointment not found" };

        
        var newBilling = billing.Adapt<Billing>();
        newBilling.PatientId = existAppointment.PatientId;
        newBilling.SubTotal = 0;
        newBilling.Total = 0;
        newBilling.PaidAmount = 0;
        newBilling.RemainingBalance = 0;
        newBilling.Status = BillStatus.Pending;
        
        context.Billings.Add(newBilling);
        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true, Billing = newBilling.Adapt<BillingDetailsDto>()};
    }

    // public async Task<BillingResponseDto> UpdateBilling(int id, UpsertBillingDto billing)
    // {
    //     var existBilling = await context.Billings.FindAsync(id);
    //
    //     if (existBilling == null)
    //         return new BillingResponseDto { Success = false, Error = "Billing not found" };
    //
    //     if (existBilling.AppointmentId != billing.AppointmentId)
    //     {
    //         var existAppointment = await context.Appointments.AsNoTracking()
    //             .FirstOrDefaultAsync(a => a.Id == existBilling.AppointmentId);
    //
    //         if (existAppointment == null)
    //             return new BillingResponseDto { Success = false, Error = "Appointment not found" };
    //
    //         existBilling.PatientId = existAppointment.PatientId;
    //         existBilling.AppointmentId = existAppointment.Id;
    //     }
    //
    //     existBilling.Date = billing.Date;
    //
    //     if (existBilling.Tax != billing.Tax && existBilling.Total != 0)
    //     {
    //         existBilling.Tax = billing.Tax;
    //         existBilling.Total = billing.SubTotal + billing.SubTotal * existBilling.Tax / 100;
    //     }
    //
    //     await context.SaveChangesAsync();
    //
    //     return new BillingResponseDto { Success = true };
    // }

    public async Task<BillingResponseDto> DeleteBilling(int id)
    {
        var billing = await context.Billings.FindAsync(id);

        if (billing == null)
            return new BillingResponseDto { Success = false, Error = "Billing not found" };

        context.Billings.Remove(billing);
        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true };
    }

    public async Task<BillingResponseDto> AddBillingItem(UpsertBillingItemDto item)
    {
        var existBilling = await context.Billings.FindAsync(item.BillingId);

        if (existBilling == null || existBilling.Status == BillStatus.Paid)
            return new BillingResponseDto { Success = false, Error = "Billing not found or billing is already paid" };
        
        var newItem = item.Adapt<BillItem>();
        
        newItem.Total = item.Quantity * item.UnitPrice;

        context.BillItems.Add(newItem);

        existBilling.SubTotal += newItem.Total;
        existBilling.Total = existBilling.SubTotal + existBilling.SubTotal * existBilling.Tax / 100;
        existBilling.RemainingBalance = existBilling.Total - existBilling.PaidAmount;

        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true };
    }

    public async Task<BillingResponseDto> DeleteItem(int id)
    {
        var existItem = await context.BillItems.FindAsync(id);

        if (existItem == null)
            return new BillingResponseDto { Success = false, Error = "Item not found" };

        var billing = await context.Billings.FindAsync(existItem.BillingId);

        if (billing != null)
        {
            billing.SubTotal -= existItem.Total;
            billing.Total = billing.SubTotal + billing.SubTotal * billing.Tax / 100;
            billing.RemainingBalance = billing.Total - billing.PaidAmount;
        }

        context.BillItems.Remove(existItem);
        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true };
    }

    public async Task<BillingResponseDto> AddBillingPayment(UpsertPaymentDto payment)
    {
        var existBilling = await context.Billings.FindAsync(payment.BillingId);

        if (existBilling == null || existBilling.Status == BillStatus.Paid)
            return new BillingResponseDto
            {
                Success = false,
                Error = "Billing not found or billing is already paid"
            };
        
        var newPayment = payment.Adapt<Payment>();
        newPayment.Date = DateOnly.FromDateTime(DateTime.UtcNow);
        
        context.Payments.Add(newPayment);

        existBilling.PaidAmount += newPayment.Amount;
        existBilling.RemainingBalance = existBilling.Total - existBilling.PaidAmount;

        if (existBilling.RemainingBalance == 0)
            existBilling.Status = BillStatus.Paid;

        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true };
    }

    public async Task<BillingResponseDto> DeletePayment(int id)
    {
        var existPayment = await context.Payments.FindAsync(id);

        if (existPayment == null)
            return new BillingResponseDto { Success = false, Error = "Payment not found" };

        var billing = await context.Billings.FindAsync(existPayment.BillingId);

        if (billing != null)
        {
            billing.PaidAmount -= existPayment.Amount;
            billing.RemainingBalance = billing.Total - billing.PaidAmount;
        }

        context.Payments.Remove(existPayment);
        await context.SaveChangesAsync();

        return new BillingResponseDto { Success = true };
    }
}