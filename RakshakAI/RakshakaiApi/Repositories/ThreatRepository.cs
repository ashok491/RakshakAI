using Microsoft.EntityFrameworkCore;
using RakshakaiApi.Data;
using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public class ThreatRepository : IThreatRepository
    {
        private readonly ApplicationDbContext _context;

        public ThreatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Threat>> GetAllAsync()
        {
            return await _context.Threats
                .Include(t => t.ThreatZones)
                .ThenInclude(tz => tz.Zone)
                .ToListAsync();
        }

        public async Task<Threat?> GetByIdAsync(int id)
        {
            return await _context.Threats
                .Include(t => t.ThreatZones)
                .ThenInclude(tz => tz.Zone)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<Threat>> GetByZoneIdAsync(int zoneId)
        {
            return await _context.ThreatZones
                .Where(tz => tz.ZoneId == zoneId)
                .Select(tz => tz.Threat)
                .Include(t => t.ThreatZones)
                .ThenInclude(tz => tz.Zone)
                .ToListAsync();
        }

        public async Task<Threat> CreateAsync(Threat threat)
        {
            _context.Threats.Add(threat);
            await _context.SaveChangesAsync();
            return threat;
        }

        public async Task UpdateAsync(Threat threat)
        {
            _context.Entry(threat).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var threat = await _context.Threats.FindAsync(id);
            if (threat != null)
            {
                _context.Threats.Remove(threat);
                await _context.SaveChangesAsync();
            }
        }
    }
}