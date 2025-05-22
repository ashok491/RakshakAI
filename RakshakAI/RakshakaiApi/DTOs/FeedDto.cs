namespace RakshakaiApi.DTOs
{
    public class FeedDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
        public string Url { get; set; } = null!;
        public string Status { get; set; } = null!;
    }
}