namespace ProjectPulse.Api.Models;

public sealed class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public Guid AssigneeId { get; set; }
    public AppUser Assignee { get; set; } = null!;
    public TaskStatus Status { get; set; }
    public PriorityLevel Priority { get; set; }
    public DateOnly DueDate { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<FileAsset> Files { get; set; } = new List<FileAsset>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
