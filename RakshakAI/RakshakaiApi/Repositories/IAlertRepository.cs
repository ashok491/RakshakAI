using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public interface IAlertRepository
    {
        Task<IEnumerable<Alert>> GetAllAsync();
        Task<IEnumerable<Alert>> GetActiveAlertsAsync();
        Task<IEnumerable<Alert>> GetAlertsByZoneIdAsync(int zoneId);
        Task<Alert?> GetByIdAsync(int id);
        Task<Alert> CreateAsync(Alert alert);
        Task UpdateAsync(Alert alert);
        Task DeleteAsync(int id);
        Task<int> GetActiveAlertCountAsync();
    }
}