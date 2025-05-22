using System.ComponentModel.DataAnnotations;

namespace RakshakaiApi.Models
{
    public class Threat
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Description { get; set; } = null!;
        
        [Required]
        [StringLength(20)]
        public string Severity { get; set; } = null!;
        
        [Required]
        public double PositionX { get; set; }
        
        [Required]
        public double PositionY { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ResolvedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<ThreatZone> ThreatZones { get; set; } = new List<ThreatZone>();
    }
}