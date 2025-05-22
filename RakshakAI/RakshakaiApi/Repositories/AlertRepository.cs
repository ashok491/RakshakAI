using Microsoft.EntityFrameworkCore;
using RakshakaiApi.Data;
using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public class AlertRepository : IAlertRepository
    {
        private readonly ApplicationDbContext _context;

        public AlertRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Alert>> GetAllAsync()
        {
            return await _context.Alerts
                .Include(a => a.Zone)
                .OrderByDescending(a => a.Timestamp)
                .ToListAsync();
        }

        public async Task<IEnumerable<Alert>> GetActiveAlertsAsync()
        {
            return await _context.Alerts
                .Include(a => a.Zone)
                .Where(a => !a.IsRead)
                .OrderByDescending(a => a.Timestamp)
                .ToListAsync();
        }

        public async Task<IEnumerable<Alert>> GetAlertsByZoneIdAsync(int zoneId)
        {
            return await _context.Alerts
                .Include(a => a.Zone)
                .Where(a => a.ZoneId == zoneId)
                .OrderByDescending(a => a.Timestamp)
                .ToListAsync();
        }

        public async Task<Alert?> GetByIdAsync(int id)
        {
            return await _context.Alerts
                .Include(a => a.Zone)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Alert> CreateAsync(Alert alert)
        {
            _context.Alerts.Add(alert);
            await _context.SaveChangesAsync();
            return alert;
        }

        public async Task UpdateAsync(Alert alert)
        {
            _context.Entry(alert).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var alert = await _context.Alerts.FindAsync(id);
            if (alert != null)
            {
                _context.Alerts.Remove(alert);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetActiveAlertCountAsync()
        {
            return await _context.Alerts
                .Where(a => !a.IsRead)
                .CountAsync();
        }
    }
}