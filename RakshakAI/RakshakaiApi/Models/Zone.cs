using System.ComponentModel.DataAnnotations;

namespace RakshakaiApi.Models
{
    public class Zone
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = null!;
        
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = null!;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();
        public virtual ICollection<ThreatZone> ThreatZones { get; set; } = new List<ThreatZone>();
    }
}