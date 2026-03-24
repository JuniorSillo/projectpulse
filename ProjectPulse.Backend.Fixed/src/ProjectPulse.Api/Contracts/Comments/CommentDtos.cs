using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Comments;

public sealed record CommentDto(
    Guid Id,
    Guid EntityId,
    string EntityType,
    Guid AuthorId,
    string AuthorName,
    string Message,
    DateTime CreatedAtUtc
);

public sealed class CreateCommentRequest
{
    [Required]
    public Guid EntityId { get; set; }

    [Required, StringLength(50)]
    public string EntityType { get; set; } = string.Empty;

    [Required, StringLength(2000)]
    public string Message { get; set; } = string.Empty;
}

public sealed class UpdateCommentRequest
{
    [Required, StringLength(2000)]
    public string Message { get; set; } = string.Empty;
}
