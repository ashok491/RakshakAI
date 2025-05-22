namespace RakshakaiApi.DTOs
{
    public class ThreatDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public string Severity { get; set; } = null!;
        public object Position { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<string> Zones { get; set; } = new List<string>();
    }
}