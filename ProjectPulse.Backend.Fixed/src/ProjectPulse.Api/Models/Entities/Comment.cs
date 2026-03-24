namespace ProjectPulse.Api.Models;

public sealed class Comment
{
    public Guid Id { get; set; }
    public Guid EntityId { get; set; }
    public string EntityType { get; set; } = string.Empty;
    public Guid AuthorId { get; set; }
    public AppUser Author { get; set; } = null!;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
