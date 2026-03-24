using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Files;

public sealed record FileDto(
    Guid Id,
    string Name,
    string FileType,
    string Url,
    Guid ProjectId,
    string ProjectName,
    Guid? TaskId,
    Guid UploaderId,
    string UploaderName,
    DateTime UploadedAtUtc
);

public class CreateFileRequest
{
    [Required, StringLength(260)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(50)]
    public string FileType { get; set; } = string.Empty;

    [Required, StringLength(1000)]
    public string Url { get; set; } = string.Empty;

    [Required]
    public Guid ProjectId { get; set; }

    public Guid? TaskId { get; set; }
}

public sealed class UpdateFileRequest : CreateFileRequest;
