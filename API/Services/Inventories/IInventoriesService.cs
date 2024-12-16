using Models;
using Models.DTOs.Inventories;

namespace API.Services.Inventories;

public interface IInventoriesService
{
    Task<GeneralResponse> GetInventories();
    Task<GeneralResponse> GetInventoriesById(int id);
    Task<GeneralResponse> AddInventory(UpsertInventoryDto inventory);
    Task<GeneralResponse> UpdateInventory(int id, UpsertInventoryDto inventory);
    Task<GeneralResponse> DeleteInventory(int id);
}