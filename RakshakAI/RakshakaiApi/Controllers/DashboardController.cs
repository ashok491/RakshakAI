using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RakshakaiApi.DTOs;
using RakshakaiApi.Services;

namespace RakshakaiApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("alerts")]
        public async Task<ActionResult<IEnumerable<AlertDto>>> GetAlerts()
        {
            var alerts = await _dashboardService.GetActiveAlertsAsync();
            return Ok(alerts);
        }

        [HttpGet("status")]
        public async Task<ActionResult<StatusDto>> GetStatus()
        {
            var status = await _dashboardService.GetStatusAsync();
            return Ok(status);
        }

        [HttpGet("feeds")]
        public async Task<ActionResult<IEnumerable<FeedDto>>> GetFeeds()
        {
            var feeds = await _dashboardService.GetActiveFeeds();
            return Ok(feeds);
        }
    }
}