using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.Inventories;
using Models.Entities;

namespace API.Services.Inventories;

public class InventoriesService(AppDbContext context) : IInventoriesService
{
    public async Task<InventoryResponseDto> GetInventories()
    {
        var inventories = await context.Inventories.AsNoTracking()
            .ProjectToType<InventoryDto>().ToListAsync();

        return new InventoryResponseDto { Success = true, Inventories = inventories };
    }

    public async Task<InventoryResponseDto> GetInventoriesById(int id)
    {
        var inventory = await context.Inventories
            .Include(i => i.Logs)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (inventory == null)
            return new InventoryResponseDto { Success = false, Error = "Item not found" };

        return new InventoryResponseDto { Success = true, Inventory = inventory.Adapt<InventoryDetailsDto>() };
    }

    public async Task<InventoryResponseDto> AddInventory(UpsertInventoryDto inventory)
    {
        var existingInv = await context.Inventories.FirstOrDefaultAsync(i => i.Name == inventory.Name);

        if (existingInv != null)
            return new InventoryResponseDto { Success = false, Error = "Inventory already exists" };

        var newInventory = inventory.Adapt<Inventory>();

        context.Inventories.Add(newInventory);
        await context.SaveChangesAsync();

        return new InventoryResponseDto { Success = true };
    }

    public async Task<InventoryResponseDto> UpdateInventory(int id, UpsertInventoryDto inventory)
    {
        var existingInventory = await context.Inventories.FindAsync(id);

        if (existingInventory == null)
            return new InventoryResponseDto { Success = false, Error = "Item not found" };

        if (existingInventory.Name != inventory.Name)
        {
            var oldInventory = await context.Inventories.FirstOrDefaultAsync(i => i.Name == inventory.Name);

            if (oldInventory != null)
                return new InventoryResponseDto { Success = false, Error = "Inventory already exists" };
        }

        existingInventory.Name = inventory.Name;
        existingInventory.Quantity = inventory.Quantity;
        existingInventory.MinQuantity = inventory.MinQuantity;
        existingInventory.ExpirationDate = inventory.ExpirationDate;

        await context.SaveChangesAsync();

        return new InventoryResponseDto { Success = true };
    }

    public async Task<InventoryResponseDto> DeleteInventory(int id)
    {
        var inventory = await context.Inventories.FindAsync(id);

        if (inventory == null)
            return new InventoryResponseDto { Success = false, Error = "Item not found" };

        context.Inventories.Remove(inventory);
        await context.SaveChangesAsync();

        return new InventoryResponseDto { Success = true };
    }
}