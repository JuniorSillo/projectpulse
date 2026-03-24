namespace ProjectPulse.Api.Models;

public sealed class FileAsset
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public Guid? TaskId { get; set; }
    public TaskItem? Task { get; set; }
    public Guid UploaderId { get; set; }
    public AppUser Uploader { get; set; } = null!;
    public DateTime UploadedAtUtc { get; set; } = DateTime.UtcNow;
}
