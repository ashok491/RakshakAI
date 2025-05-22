using RakshakaiApi.DTOs;
using RakshakaiApi.Repositories;

namespace RakshakaiApi.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IAlertRepository _alertRepository;
        private readonly IZoneRepository _zoneRepository;
        private readonly IFeedRepository _feedRepository;

        public DashboardService(
            IAlertRepository alertRepository,
            IZoneRepository zoneRepository,
            IFeedRepository feedRepository)
        {
            _alertRepository = alertRepository;
            _zoneRepository = zoneRepository;
            _feedRepository = feedRepository;
        }

        public async Task<IEnumerable<AlertDto>> GetActiveAlertsAsync()
        {
            var alerts = await _alertRepository.GetActiveAlertsAsync();
            return alerts.Select(a => new AlertDto
            {
                Id = a.Id,
                Message = a.Message,
                Zone = a.Zone.Name,
                Severity = a.Severity,
                Timestamp = FormatTimestamp(a.Timestamp),
                IsRead = a.IsRead
            });
        }

        public async Task<StatusDto> GetStatusAsync()
        {
            var activeAlertCount = await _alertRepository.GetActiveAlertCountAsync();
            var activeZoneCount = (await _zoneRepository.GetAllAsync()).Count(z => z.Status == "Active");
            var camerasOnline = await _feedRepository.GetActiveFeedCountAsync();

            return new StatusDto
            {
                ActiveAlerts = activeAlertCount,
                ActiveZones = activeZoneCount,
                CamerasOnline = camerasOnline
            };
        }

        public async Task<IEnumerable<FeedDto>> GetActiveFeeds()
        {
            var feeds = await _feedRepository.GetActiveAsync();
            return feeds.Select(f => new FeedDto
            {
                Id = f.Id,
                Type = f.Type,
                Url = f.Url,
                Status = f.Status
            });
        }

        private string FormatTimestamp(DateTime timestamp)
        {
            // Format as HH:MM
            return timestamp.ToString("HH:mm");
        }
    }
}