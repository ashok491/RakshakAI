using System.ComponentModel.DataAnnotations;

namespace RakshakaiApi.Models
{
    public class Feed
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Type { get; set; } = null!;
        
        [Required]
        [StringLength(200)]
        public string Url { get; set; } = null!;
        
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = null!;
    }
}