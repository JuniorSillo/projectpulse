using System.ComponentModel.DataAnnotations;

namespace ProjectPulse.Api.Contracts.Users;

public sealed record UserDto(
    Guid Id,
    string Name,
    string Email,
    string Role,
    bool IsActive,
    int ProjectsAssigned,
    DateTime LastActiveUtc
);

public sealed class CreateUserRequest
{
    [Required, StringLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty;

    [Required, MinLength(8)]
    public string Password { get; set; } = string.Empty;
}

public sealed class UpdateUserRequest
{
    [Required, StringLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}
