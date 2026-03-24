using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Users;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/users")]
public sealed class UsersController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<UserDto>>>> GetAll(CancellationToken cancellationToken)
    {
        var users = await dbContext.Users
            .OrderBy(x => x.Name)
            .Select(x => x.ToDto())
            .ToListAsync(cancellationToken);

        return Ok(new ApiResponse<IReadOnlyList<UserDto>>(true, users));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user is null)
            return NotFound(new ApiResponse<UserDto>(false, null, "User not found."));

        return Ok(new ApiResponse<UserDto>(true, user.ToDto()));
    }

    [HttpPost]
    [Authorize(Roles = nameof(AppRole.Admin))]
    public async Task<ActionResult<ApiResponse<UserDto>>> Create([FromBody] CreateUserRequest request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<AppRole>(request.Role, true, out var role))
            return BadRequest(new ApiResponse<UserDto>(false, null, "Invalid role."));

        if (await dbContext.Users.AnyAsync(x => x.Email.ToLower() == request.Email.ToLower(), cancellationToken))
            return Conflict(new ApiResponse<UserDto>(false, null, "Email already exists."));

        var user = new AppUser
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Role = role,
            IsActive = true,
            LastActiveUtc = DateTime.UtcNow
        };

        var hasher = new PasswordHasher<AppUser>();
        user.PasswordHash = hasher.HashPassword(user, request.Password);

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = user.Id }, new ApiResponse<UserDto>(true, user.ToDto()));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = nameof(AppRole.Admin))]
    public async Task<ActionResult<ApiResponse<UserDto>>> Update(Guid id, [FromBody] UpdateUserRequest request, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user is null)
            return NotFound(new ApiResponse<UserDto>(false, null, "User not found."));

        if (!Enum.TryParse<AppRole>(request.Role, true, out var role))
            return BadRequest(new ApiResponse<UserDto>(false, null, "Invalid role."));

        user.Name = request.Name;
        user.Email = request.Email;
        user.Role = role;
        user.IsActive = request.IsActive;

        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok(new ApiResponse<UserDto>(true, user.ToDto()));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = nameof(AppRole.Admin))]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user is null)
            return NotFound(new ApiResponse<string>(false, null, "User not found."));

        dbContext.Users.Remove(user);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}
