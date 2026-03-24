namespace ProjectPulse.Api.Models;

public sealed class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Client { get; set; } = string.Empty;
    public Guid ManagerId { get; set; }
    public AppUser Manager { get; set; } = null!;
    public ProjectStatus Status { get; set; }
    public int Progress { get; set; }
    public DateOnly DueDate { get; set; }
    public RiskLevel Risk { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

    public ICollection<ProjectTeamMember> TeamMembers { get; set; } = new List<ProjectTeamMember>();
    public ICollection<Milestone> Milestones { get; set; } = new List<Milestone>();
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    public ICollection<FileAsset> Files { get; set; } = new List<FileAsset>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
