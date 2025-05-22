using System.ComponentModel.DataAnnotations;

namespace RakshakaiApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Username { get; set; } = null!;
        
        [Required]
        public string PasswordHash { get; set; } = null!;
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        
        [Required]
        [StringLength(20)]
        public string Role { get; set; } = null!;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLogin { get; set; }
    }
}