using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public interface IZoneRepository
    {
        Task<IEnumerable<Zone>> GetAllAsync();
        Task<Zone?> GetByIdAsync(int id);
        Task<Zone> CreateAsync(Zone zone);
        Task UpdateAsync(Zone zone);
        Task DeleteAsync(int id);
        Task<int> GetThreatCountByZoneIdAsync(int zoneId);
    }
}