using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.InventoryLogs;
using Models.Entities;

namespace API.Services.InventoryLogs;

public class InventoryLogsService(AppDbContext context) : IInventoryLogsService
{
    public async Task<GeneralResponse> GetInventoryLogs()
    {
        var logs = await context.InventoryLogs.AsNoTracking()
            .OrderByDescending(l => l.CreatedAt)
            .Include(l => l.Inventory)
            .Include(l => l.Supplier)
            .ProjectToType<InventoryLogDto>()
            .ToListAsync();
        
        return new GeneralResponse() {Success = true, Data = logs};
    }

    public async Task<GeneralResponse> GetInventoryLogsById(int id)
    {
        var log = await context.InventoryLogs.AsNoTracking()
            .Include(l => l.Inventory)
            .Include(l => l.Supplier)
            .FirstOrDefaultAsync(l => l.Id == id);
        
        if (log == null)
            return new GeneralResponse() {Success = false, Error = "Log not found"};
        
        return new GeneralResponse() {Success = true, Data = log.Adapt<InventoryLogDto>()};
    }

    public async Task<GeneralResponse> AddInventoryLog(UpsertInventoryLogDto log)
    {
        var existInv = await context.Inventories.AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == log.InventoryId);
        
        if (existInv == null)
            return new GeneralResponse() {Success = false, Error = "Inventory not found"};
        
        if (existInv.Quantity < log.Quantity)
            return new GeneralResponse() {Success = false, Error = "Inventory is not enough"};

        if (log.Type == LogType.Insert)
        {
            if (!log.SupplierId.HasValue)
                return new GeneralResponse() { Success = false, Error = "Supplier is required" };
            
            var existSupplier = await context.Suppliers.AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == log.SupplierId);
                
            if (existSupplier == null)
                return new GeneralResponse() {Success = false, Error = "Supplier not found"};
            
            existInv.Quantity += log.Quantity;
        }
        else
        {
            existInv.Quantity -= log.Quantity;
        }
        
        var newLog = log.Adapt<InventoryLog>();
        
        context.InventoryLogs.Add(newLog);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true, Data = newLog};
    }

    public async Task<GeneralResponse> UpdateInventoryLog(int id, UpsertInventoryLogDto log)
    {
        var existLog = await context.InventoryLogs.FindAsync(id);
        
        if (existLog == null)
            return new GeneralResponse() {Success = false, Error = "Log not found"};
        
        var existInv = await context.Inventories.AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == log.InventoryId);
            
        if (existInv == null)
            return new GeneralResponse() {Success = false, Error = "Inventory not found"};

        if (log.Type == LogType.Insert && log.Type != existLog.Type)
        {
            if (!log.SupplierId.HasValue)
            {
                return new GeneralResponse() { Success = false, Error = "Supplier is required" };
            }
            
            var existSupplier = await context.Suppliers.AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == log.SupplierId);
                
            if (existSupplier == null)
                return new GeneralResponse() {Success = false, Error = "Supplier not found"};
        }
        
        if (log.Quantity != existLog.Quantity)
        {
            var diff = existLog.Quantity - log.Quantity;
            
            if (diff < 0 && existInv.Quantity < IntPtr.Abs(diff))
                return new GeneralResponse() {Success = false, Error = "Inventory is not enough"};
            
            existLog.Quantity += diff;
        }
        
        existLog.InventoryId = log.InventoryId;
        existLog.Type = log.Type;
        existLog.SupplierId = log.SupplierId;
        existLog.Description = log.Description;
        existLog.Quantity = log.Quantity;
        
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }

    public async Task<GeneralResponse> DeleteInventoryLog(int id)
    {
        var log = await context.InventoryLogs.FindAsync(id);
        
        if (log == null)
            return new GeneralResponse() {Success = false, Error = "Log not found"};
        
        var inventory = await context.Inventories.FindAsync(log.InventoryId);

        if (log.Type == LogType.Insert)
        {
            if (inventory!.Quantity < log.Quantity)
                return new GeneralResponse() {Success = false, Error = "Inventory is not enough"};
            
            inventory.Quantity -= log.Quantity;
        }
        else
        {
            inventory!.Quantity += log.Quantity;
        }
        
        context.InventoryLogs.Remove(log);
        await context.SaveChangesAsync();
        
        return new GeneralResponse() {Success = true};
    }
}