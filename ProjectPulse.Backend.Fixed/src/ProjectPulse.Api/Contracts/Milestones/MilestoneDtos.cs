using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Milestones;

public sealed record MilestoneDto(
    Guid Id,
    Guid ProjectId,
    string ProjectName,
    string Title,
    DateOnly DueDate,
    int Progress,
    string Status
);

public class CreateMilestoneRequest
{
    [Required]
    public Guid ProjectId { get; set; }

    [Required, StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public DateOnly DueDate { get; set; }

    [Range(0, 100)]
    public int Progress { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;
}

public sealed class UpdateMilestoneRequest : CreateMilestoneRequest;
