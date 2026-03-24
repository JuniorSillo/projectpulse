using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Tasks;

public sealed record TaskListItemDto(
    Guid Id,
    string Title,
    Guid ProjectId,
    string ProjectName,
    Guid AssigneeId,
    string AssigneeName,
    string Status,
    string Priority,
    DateOnly DueDate
);

public sealed record TaskDetailsDto(
    Guid Id,
    string Title,
    Guid ProjectId,
    string ProjectName,
    Guid AssigneeId,
    string AssigneeName,
    string Status,
    string Priority,
    DateOnly DueDate,
    string Description
);

public class CreateTaskRequest
{
    [Required, StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public Guid ProjectId { get; set; }

    [Required]
    public Guid AssigneeId { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;

    [Required]
    public string Priority { get; set; } = string.Empty;

    [Required]
    public DateOnly DueDate { get; set; }

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;
}

public sealed class UpdateTaskRequest : CreateTaskRequest;