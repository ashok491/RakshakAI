namespace RakshakaiApi.DTOs
{
    public class AlertDto
    {
        public int Id { get; set; }
        public string Message { get; set; } = null!;
        public string Zone { get; set; } = null!;
        public string Severity { get; set; } = null!;
        public string Timestamp { get; set; } = null!;
        public bool IsRead { get; set; }
    }
}