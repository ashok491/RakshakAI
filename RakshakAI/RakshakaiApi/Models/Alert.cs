using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RakshakaiApi.Models
{
    public class Alert
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Message { get; set; } = null!;
        
        [Required]
        [ForeignKey("Zone")]
        public int ZoneId { get; set; }
        
        [Required]
        [StringLength(20)]
        public string Severity { get; set; } = null!;
        
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
        
        // Navigation property
        public virtual Zone Zone { get; set; } = null!;
    }
}