using Models;
using Models.DTOs.InventoryLogs;

namespace API.Services.InventoryLogs;

public interface IInventoryLogsService
{
    Task<InventoryLogResponseDto> GetInventoryLogs();
    Task<InventoryLogResponseDto> GetInventoryLogsById(int id);
    Task<InventoryLogResponseDto> AddInventoryLog(AddInventoryDto log);
    Task<InventoryLogResponseDto> UseInventoryLog(UseInventoryDto log);
    // Task<InventoryLogResponseDto> UpdateInventoryLog(int id, UpsertInventoryLogDto log);
    Task<InventoryLogResponseDto> DeleteInventoryLog(int id);
}