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
    public async Task<GeneralResponse> GetBillings()
    {
        var billings = await context.Billings.OrderByDescending(b => b.Date)
            .AsNoTracking()
            .Include(b => b.Appointment)
            .Include(b => b.Patient)
            .ProjectToType<BillingDto>()
            .ToListAsync();
        
        return new GeneralResponse() {Success = true, Data = billings};
    }

    public async Task<GeneralResponse> GetBillingById(int id)
    {
        var billing = await context.Billings.AsNoTracking()
            .Include(b => b.Appointment)
            .Include(b => b.Patient)
            .Include(b => b.Payments)
            .Include(b => b.BillItems)
            .FirstOrDefaultAsync(b => b.Id == id);
        
        if (billing == null)
            return new GeneralResponse() {Success = false, Error = "Billing not found"};
        
        return new GeneralResponse() {Success = true, Data = billing.Adapt<BillingDetailsDto>()};
    }

    public async Task<GeneralResponse> AddBilling(UpsertBillingDto billing)
    {
        var existAppointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == billing.AppointmentId);
        
        if (existAppointment == null)
            return new GeneralResponse() {Success = false, Error = "Appointment not found"};
        
        billing.PatientId = existAppointment.PatientId;
        billing.Status = BillStatus.Pending;
        
        var newBilling = billing.Adapt<Billing>();
        context.Billings.Add(newBilling);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true, Data = newBilling};
    }

    public async Task<GeneralResponse> UpdateBilling(int id, UpsertBillingDto billing)
    {
        var existBilling = await context.Billings.FindAsync(id);
        
        if (existBilling == null)
            return new GeneralResponse() {Success = false, Error = "Billing not found"};

        if (existBilling.AppointmentId != billing.AppointmentId)
        {
            var existAppointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == existBilling.AppointmentId);
            
            if (existAppointment == null)
                return new GeneralResponse() {Success = false, Error = "Appointment not found"};
            
            existBilling.PatientId = existAppointment.PatientId;
            existBilling.AppointmentId = existAppointment.Id;
        }
        
        existBilling.Date = billing.Date;
        
        if (existBilling.Tax != billing.Tax && existBilling.Total != 0)
        {
            existBilling.Tax = billing.Tax;
            existBilling.Total = billing.SubTotal + (billing.SubTotal * existBilling.Tax / 100);
        }
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> DeleteBilling(int id)
    {
        var billing = await context.Billings.FindAsync(id);
        
        if (billing == null)
            return new GeneralResponse() {Success = false, Error = "Billing not found"};
        
        context.Billings.Remove(billing);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> AddBillingItem(int id, UpsertBillingItemDto item)
    {
        var existBilling = await context.Billings.FindAsync(id);
        
        if (existBilling == null || existBilling.Status == BillStatus.Paid)
            return new GeneralResponse() {Success = false, Error = "Billing not found or billing is already paid"};
        
        context.BillItems.Add(item.Adapt<BillItem>());
        
        existBilling.SubTotal += item.Total;
        existBilling.Total = existBilling.SubTotal + (existBilling.SubTotal * existBilling.Tax / 100);
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> AddBillingPayment(int id, UpsertPaymentDto payment)
    {
        var existBilling = await context.Billings.FindAsync(id);
        
        if (existBilling == null || existBilling.Status == BillStatus.Paid)
            return new GeneralResponse() {Success = false, 
                Error = "Billing not found or billing is already paid"};
        
        payment.Date = DateOnly.FromDateTime(DateTime.UtcNow);
        context.Payments.Add(payment.Adapt<Payment>());
        
        existBilling.PaidAmount += payment.Amount;
        existBilling.RemainingBalance = existBilling.Total - existBilling.PaidAmount;
        
        if (existBilling.RemainingBalance == 0)
            existBilling.Status = BillStatus.Paid;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
}