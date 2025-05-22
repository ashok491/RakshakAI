using Microsoft.EntityFrameworkCore;
using RakshakaiApi.Data;
using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public class ZoneRepository : IZoneRepository
    {
        private readonly ApplicationDbContext _context;

        public ZoneRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Zone>> GetAllAsync()
        {
            return await _context.Zones
                .Include(z => z.ThreatZones)
                .ToListAsync();
        }

        public async Task<Zone?> GetByIdAsync(int id)
        {
            return await _context.Zones
                .Include(z => z.ThreatZones)
                .FirstOrDefaultAsync(z => z.Id == id);
        }

        public async Task<Zone> CreateAsync(Zone zone)
        {
            _context.Zones.Add(zone);
            await _context.SaveChangesAsync();
            return zone;
        }

        public async Task UpdateAsync(Zone zone)
        {
            _context.Entry(zone).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var zone = await _context.Zones.FindAsync(id);
            if (zone != null)
            {
                _context.Zones.Remove(zone);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetThreatCountByZoneIdAsync(int zoneId)
        {
            return await _context.ThreatZones
                .Where(tz => tz.ZoneId == zoneId)
                .CountAsync();
        }
    }
}