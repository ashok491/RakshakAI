using Microsoft.EntityFrameworkCore;
using RakshakaiApi.Data;
using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public class FeedRepository : IFeedRepository
    {
        private readonly ApplicationDbContext _context;

        public FeedRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feed>> GetAllAsync()
        {
            return await _context.Feeds.ToListAsync();
        }

        public async Task<IEnumerable<Feed>> GetActiveAsync()
        {
            return await _context.Feeds
                .Where(f => f.Status == "Active")
                .ToListAsync();
        }

        public async Task<Feed?> GetByIdAsync(int id)
        {
            return await _context.Feeds.FindAsync(id);
        }

        public async Task<Feed> CreateAsync(Feed feed)
        {
            _context.Feeds.Add(feed);
            await _context.SaveChangesAsync();
            return feed;
        }

        public async Task UpdateAsync(Feed feed)
        {
            _context.Entry(feed).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var feed = await _context.Feeds.FindAsync(id);
            if (feed != null)
            {
                _context.Feeds.Remove(feed);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetActiveFeedCountAsync()
        {
            return await _context.Feeds
                .Where(f => f.Status == "Active")
                .CountAsync();
        }
    }
}