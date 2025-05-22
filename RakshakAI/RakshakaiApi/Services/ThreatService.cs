using RakshakaiApi.DTOs;
using RakshakaiApi.Repositories;

namespace RakshakaiApi.Services
{
    public class ThreatService : IThreatService
    {
        private readonly IThreatRepository _threatRepository;
        private readonly IZoneRepository _zoneRepository;

        public ThreatService(IThreatRepository threatRepository, IZoneRepository zoneRepository)
        {
            _threatRepository = threatRepository;
            _zoneRepository = zoneRepository;
        }

        public async Task<IEnumerable<ThreatDto>> GetAllThreatsAsync()
        {
            var threats = await _threatRepository.GetAllAsync();
            return threats.Select(t => new ThreatDto
            {
                Id = t.Id,
                Description = t.Description,
                Severity = t.Severity,
                Position = new { x = t.PositionX, y = t.PositionY },
                CreatedAt = t.CreatedAt,
                Zones = t.ThreatZones.Select(tz => tz.Zone.Name).ToList()
            });
        }

        public async Task<ThreatDto?> GetThreatByIdAsync(int id)
        {
            var threat = await _threatRepository.GetByIdAsync(id);
            if (threat == null)
                return null;

            return new ThreatDto
            {
                Id = threat.Id,
                Description = threat.Description,
                Severity = threat.Severity,
                Position = new { x = threat.PositionX, y = threat.PositionY },
                CreatedAt = threat.CreatedAt,
                Zones = threat.ThreatZones.Select(tz => tz.Zone.Name).ToList()
            };
        }

        public async Task<IEnumerable<ThreatDto>> GetThreatsByZoneIdAsync(int zoneId)
        {
            var threats = await _threatRepository.GetByZoneIdAsync(zoneId);
            return threats.Select(t => new ThreatDto
            {
                Id = t.Id,
                Description = t.Description,
                Severity = t.Severity,
                Position = new { x = t.PositionX, y = t.PositionY },
                CreatedAt = t.CreatedAt,
                Zones = t.ThreatZones.Select(tz => tz.Zone.Name).ToList()
            });
        }

        public async Task<IEnumerable<ZoneDto>> GetAllZonesAsync()
        {
            var zones = await _zoneRepository.GetAllAsync();
            var zoneDtos = new List<ZoneDto>();

            foreach (var zone in zones)
            {
                var threatCount = await _zoneRepository.GetThreatCountByZoneIdAsync(zone.Id);
                zoneDtos.Add(new ZoneDto
                {
                    Id = zone.Id,
                    Name = zone.Name,
                    Status = zone.Status,
                    ThreatCount = threatCount
                });
            }

            return zoneDtos;
        }

        public async Task<ZoneDto?> GetZoneByIdAsync(int id)
        {
            var zone = await _zoneRepository.GetByIdAsync(id);
            if (zone == null)
                return null;

            var threatCount = await _zoneRepository.GetThreatCountByZoneIdAsync(id);
            return new ZoneDto
            {
                Id = zone.Id,
                Name = zone.Name,
                Status = zone.Status,
                ThreatCount = threatCount
            };
        }
    }
}