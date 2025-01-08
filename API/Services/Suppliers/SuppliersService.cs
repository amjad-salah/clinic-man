using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Suppliers;
using Models.Entities;

namespace API.Services.Suppliers;

public class SuppliersService(AppDbContext context) : ISuppliersService
{
    public async Task<SupplierResponseDto> GetSuppliers()
    {
        var suppliers = await context.Suppliers.AsNoTracking()
            .ProjectToType<SupplierDto>()
            .ToListAsync();

        return new SupplierResponseDto { Success = true, Suppliers = suppliers };
    }

    public async Task<SupplierResponseDto> GetSupplierById(int id)
    {
        var supplier = await context.Suppliers.AsNoTracking()
            .Include(s => s.Logs)
            .ThenInclude(l => l.Inventory)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (supplier == null)
            return new SupplierResponseDto { Success = false, Error = "Supplier not found" };

        return new SupplierResponseDto { Success = true, Supplier = supplier.Adapt<SupplierDetailsDto>() };
    }

    public async Task<SupplierResponseDto> AddSupplier(UpsertSupplierDto supplier)
    {
        var existSupplier = await context.Suppliers.AsNoTracking().FirstOrDefaultAsync(s => s.Name == supplier.Name);

        if (existSupplier != null)
            return new SupplierResponseDto { Success = false, Error = "Supplier already exists" };

        var newSupplier = supplier.Adapt<Supplier>();

        context.Suppliers.Add(newSupplier);
        await context.SaveChangesAsync();

        return new SupplierResponseDto { Success = true };
    }

    public async Task<SupplierResponseDto> UpdateSupplier(int id, UpsertSupplierDto supplier)
    {
        var existSupplier = await context.Suppliers.FindAsync(id);

        if (existSupplier == null)
            return new SupplierResponseDto { Success = false, Error = "Supplier not found" };

        if (existSupplier.Name != supplier.Name)
        {
            var oldSupplier = await context.Suppliers.AsNoTracking()
                .FirstOrDefaultAsync(s => s.Name == supplier.Name);

            if (oldSupplier != null)
                return new SupplierResponseDto { Success = false, Error = "Supplier already exists" };
        }

        existSupplier.Name = supplier.Name;
        existSupplier.Address = supplier.Address;
        existSupplier.ContactInfo = supplier.ContactInfo;

        await context.SaveChangesAsync();

        return new SupplierResponseDto { Success = true };
    }

    public async Task<SupplierResponseDto> DeleteSupplier(int id)
    {
        var supplier = await context.Suppliers.FindAsync(id);

        if (supplier == null)
            return new SupplierResponseDto { Success = false, Error = "Supplier not found" };

        context.Suppliers.Remove(supplier);
        await context.SaveChangesAsync();

        return new SupplierResponseDto { Success = true };
    }
}