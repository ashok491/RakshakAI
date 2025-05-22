using RakshakaiApi.Models;

namespace RakshakaiApi.Repositories
{
    public interface IFeedRepository
    {
        Task<IEnumerable<Feed>> GetAllAsync();
        Task<IEnumerable<Feed>> GetActiveAsync();
        Task<Feed?> GetByIdAsync(int id);
        Task<Feed> CreateAsync(Feed feed);
        Task UpdateAsync(Feed feed);
        Task DeleteAsync(int id);
        Task<int> GetActiveFeedCountAsync();
    }
}