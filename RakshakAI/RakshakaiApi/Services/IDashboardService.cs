using RakshakaiApi.DTOs;

namespace RakshakaiApi.Services
{
    public interface IDashboardService
    {
        Task<IEnumerable<AlertDto>> GetActiveAlertsAsync();
        Task<StatusDto> GetStatusAsync();
        Task<IEnumerable<FeedDto>> GetActiveFeeds();
    }
}