namespace ProjectPulse.Api.Models;

public sealed class ProjectTeamMember
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
}
