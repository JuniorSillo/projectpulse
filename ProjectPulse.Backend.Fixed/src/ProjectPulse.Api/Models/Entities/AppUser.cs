namespace ProjectPulse.Api.Models;

public sealed class AppUser
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public AppRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public int ProjectsAssigned { get; set; }
    public DateTime LastActiveUtc { get; set; } = DateTime.UtcNow;

    public ICollection<Project> ManagedProjects { get; set; } = new List<Project>();
    public ICollection<ProjectTeamMember> ProjectMemberships { get; set; } = new List<ProjectTeamMember>();
    public ICollection<TaskItem> AssignedTasks { get; set; } = new List<TaskItem>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<FileAsset> UploadedFiles { get; set; } = new List<FileAsset>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
