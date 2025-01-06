using Models;
using Models.DTOs.Inventories;

namespace API.Services.Inventories;

public interface IInventoriesService
{
    Task<InventoryResponseDto> GetInventories();
    Task<InventoryResponseDto> GetInventoriesById(int id);
    Task<InventoryResponseDto> AddInventory(UpsertInventoryDto inventory);
    Task<InventoryResponseDto> UpdateInventory(int id, UpsertInventoryDto inventory);
    Task<InventoryResponseDto> DeleteInventory(int id);
}