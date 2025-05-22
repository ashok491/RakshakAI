using System.ComponentModel.DataAnnotations.Schema;

namespace RakshakaiApi.Models
{
    public class ThreatZone
    {
        [ForeignKey("Threat")]
        public int ThreatId { get; set; }
        
        [ForeignKey("Zone")]
        public int ZoneId { get; set; }
        
        // Navigation properties
        public virtual Threat Threat { get; set; } = null!;
        public virtual Zone Zone { get; set; } = null!;
    }
}