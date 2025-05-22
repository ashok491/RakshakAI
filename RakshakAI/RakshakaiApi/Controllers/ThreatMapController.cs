using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RakshakaiApi.DTOs;
using RakshakaiApi.Services;

namespace RakshakaiApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ThreatMapController : ControllerBase
    {
        private readonly IThreatService _threatService;

        public ThreatMapController(IThreatService threatService)
        {
            _threatService = threatService;
        }

        [HttpGet("threats")]
        public async Task<ActionResult<IEnumerable<ThreatDto>>> GetThreats()
        {
            var threats = await _threatService.GetAllThreatsAsync();
            return Ok(threats);
        }

        [HttpGet("threats/{id}")]
        public async Task<ActionResult<ThreatDto>> GetThreat(int id)
        {
            var threat = await _threatService.GetThreatByIdAsync(id);
            
            if (threat == null)
                return NotFound();
                
            return Ok(threat);
        }

        [HttpGet("zones")]
        public async Task<ActionResult<IEnumerable<ZoneDto>>> GetZones()
        {
            var zones = await _threatService.GetAllZonesAsync();
            return Ok(zones);
        }

        [HttpGet("zones/{id}")]
        public async Task<ActionResult<ZoneDto>> GetZone(int id)
        {
            var zone = await _threatService.GetZoneByIdAsync(id);
            
            if (zone == null)
                return NotFound();
                
            return Ok(zone);
        }

        [HttpGet("zones/{id}/threats")]
        public async Task<ActionResult<IEnumerable<ThreatDto>>> GetThreatsByZone(int id)
        {
            var threats = await _threatService.GetThreatsByZoneIdAsync(id);
            return Ok(threats);
        }
    }
}