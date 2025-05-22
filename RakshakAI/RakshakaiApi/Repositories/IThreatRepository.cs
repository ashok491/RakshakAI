using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public interface IThreatRepository
    {
        Task<IEnumerable<Threat>> GetAllAsync();
        Task<Threat?> GetByIdAsync(int id);
        Task<IEnumerable<Threat>> GetByZoneIdAsync(int zoneId);
        Task<Threat> CreateAsync(Threat threat);
        Task UpdateAsync(Threat threat);
        Task DeleteAsync(int id);
    }
}