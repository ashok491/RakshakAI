namespace RakshakaiApi.DTOs
{
    public class ZoneDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int ThreatCount { get; set; }
    }
}