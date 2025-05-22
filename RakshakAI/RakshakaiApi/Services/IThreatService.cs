using RakshakaiApi.DTOs;

namespace RakshakaiApi.Services
{
    public interface IThreatService
    {
        Task<IEnumerable<ThreatDto>> GetAllThreatsAsync();
        Task<ThreatDto?> GetThreatByIdAsync(int id);
        Task<IEnumerable<ThreatDto>> GetThreatsByZoneIdAsync(int zoneId);
        Task<IEnumerable<ZoneDto>> GetAllZonesAsync();
        Task<ZoneDto?> GetZoneByIdAsync(int id);
    }
}