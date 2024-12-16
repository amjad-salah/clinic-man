using Models;
using Models.DTOs.InventoryLogs;
namespace API.Services.InventoryLogs;

public interface IInventoryLogsService
{
    Task<GeneralResponse> GetInventoryLogs();
    Task<GeneralResponse> GetInventoryLogsById(int id);
    Task<GeneralResponse> AddInventoryLog(UpsertInventoryLogDto log);
    Task<GeneralResponse> UpdateInventoryLog(int id, UpsertInventoryLogDto log);
    Task<GeneralResponse> DeleteInventoryLog(int id);
}