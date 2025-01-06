using Models;
using Models.DTOs.Suppliers;

namespace API.Services.Suppliers;

public interface ISuppliersService
{
    Task<SupplierResponseDto> GetSuppliers();
    Task<SupplierResponseDto> GetSupplierById(int id);
    Task<SupplierResponseDto> AddSupplier(UpsertSupplierDto supplier);
    Task<SupplierResponseDto> UpdateSupplier(int id, UpsertSupplierDto supplier);
    Task<SupplierResponseDto> DeleteSupplier(int id);
}