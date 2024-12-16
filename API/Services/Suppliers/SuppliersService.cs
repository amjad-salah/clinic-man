using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Suppliers;
using Models.Entities;

namespace API.Services.Suppliers;

public class SuppliersService(AppDbContext context) : ISuppliersService
{
    public async Task<GeneralResponse> GetSuppliers()
    {
        var suppliers = await context.Suppliers.AsNoTracking()
            .ProjectToType<SupplierDto>()
            .ToListAsync();

        return new GeneralResponse { Success = true, Data = suppliers };
    }

    public async Task<GeneralResponse> GetSupplierById(int id)
    {
        var supplier = await context.Suppliers.AsNoTracking()
            .Include(s => s.Logs)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (supplier == null)
            return new GeneralResponse { Success = false, Error = "Supplier not found" };

        return new GeneralResponse { Success = true, Data = supplier.Adapt<SupplierDetailsDto>() };
    }

    public async Task<GeneralResponse> AddSupplier(UpsertSupplierDto supplier)
    {
        var existSupplier = await context.Suppliers.AsNoTracking().FirstOrDefaultAsync(s => s.Name == supplier.Name);

        if (existSupplier != null)
            return new GeneralResponse { Success = false, Error = "Supplier already exists" };

        var newSupplier = supplier.Adapt<Supplier>();

        context.Suppliers.Add(newSupplier);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true, Data = newSupplier };
    }

    public async Task<GeneralResponse> UpdateSupplier(int id, UpsertSupplierDto supplier)
    {
        var existSupplier = await context.Suppliers.FindAsync(id);

        if (existSupplier == null)
            return new GeneralResponse { Success = false, Error = "Supplier not found" };

        if (existSupplier.Name != supplier.Name)
        {
            var oldSupplier = await context.Suppliers.AsNoTracking()
                .FirstOrDefaultAsync(s => s.Name == supplier.Name);

            if (oldSupplier != null)
                return new GeneralResponse { Success = false, Error = "Supplier already exists" };
        }

        existSupplier.Name = supplier.Name;
        existSupplier.Address = supplier.Address;
        existSupplier.ContactInfo = supplier.ContactInfo;

        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }

    public async Task<GeneralResponse> DeleteSupplier(int id)
    {
        var supplier = await context.Suppliers.FindAsync(id);

        if (supplier == null)
            return new GeneralResponse { Success = false, Error = "Supplier not found" };

        context.Suppliers.Remove(supplier);
        await context.SaveChangesAsync();

        return new GeneralResponse { Success = true };
    }
}