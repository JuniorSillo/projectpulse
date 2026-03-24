using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Projects;

public sealed record ProjectListItemDto(
    Guid Id,
    string Name,
    string Client,
    Guid ManagerId,
    string ManagerName,
    string Status,
    int Progress,
    DateOnly DueDate,
    string Risk
);

public sealed record ProjectDetailsDto(
    Guid Id,
    string Name,
    string Client,
    Guid ManagerId,
    string ManagerName,
    string Status,
    int Progress,
    DateOnly DueDate,
    string Risk,
    string Description,
    IReadOnlyList<Guid> TeamIds
);

public class CreateProjectRequest
{
    [Required, StringLength(160)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(160)]
    public string Client { get; set; } = string.Empty;

    [Required]
    public Guid ManagerId { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;

    [Range(0, 100)]
    public int Progress { get; set; }

    [Required]
    public DateOnly DueDate { get; set; }

    [Required]
    public string Risk { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    public List<Guid> TeamIds { get; set; } = [];
}

public sealed class UpdateProjectRequest : CreateProjectRequest;
