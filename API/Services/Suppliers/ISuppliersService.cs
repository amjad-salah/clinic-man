using Models;
using Models.DTOs.Suppliers;

namespace API.Services.Suppliers;

public interface ISuppliersService
{
    Task<GeneralResponse> GetSuppliers();
    Task<GeneralResponse> GetSupplierById(int id);
    Task<GeneralResponse> AddSupplier(UpsertSupplierDto supplier);
    Task<GeneralResponse> UpdateSupplier(int id, UpsertSupplierDto supplier);
    Task<GeneralResponse> DeleteSupplier(int id);
}