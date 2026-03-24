using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Files;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/files")]
public sealed class FilesController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<FileDto>>>> GetAll([FromQuery] Guid? projectId, CancellationToken cancellationToken)
    {
        var query = dbContext.Files
            .Include(x => x.Project)
            .Include(x => x.Uploader)
            .AsQueryable();

        if (projectId.HasValue)
            query = query.Where(x => x.ProjectId == projectId.Value);

        var items = await query.OrderByDescending(x => x.UploadedAtUtc).ToListAsync(cancellationToken);
        return Ok(new ApiResponse<IReadOnlyList<FileDto>>(true, items.Select(x => x.ToDto()).ToList()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<FileDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var file = await dbContext.Files
            .Include(x => x.Project)
            .Include(x => x.Uploader)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (file is null)
            return NotFound(new ApiResponse<FileDto>(false, null, "File not found."));

        return Ok(new ApiResponse<FileDto>(true, file.ToDto()));
    }

    [HttpPost]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)},{nameof(AppRole.Developer)}")]
    public async Task<ActionResult<ApiResponse<FileDto>>> Create([FromBody] CreateFileRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = User.GetUserId();
        if (!await dbContext.Projects.AnyAsync(x => x.Id == request.ProjectId, cancellationToken))
            return BadRequest(new ApiResponse<FileDto>(false, null, "Project not found."));

        var file = new FileAsset
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            FileType = request.FileType,
            Url = request.Url,
            ProjectId = request.ProjectId,
            TaskId = request.TaskId,
            UploaderId = currentUserId,
            UploadedAtUtc = DateTime.UtcNow
        };

        dbContext.Files.Add(file);
        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Files
            .Include(x => x.Project)
            .Include(x => x.Uploader)
            .FirstAsync(x => x.Id == file.Id, cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = file.Id }, new ApiResponse<FileDto>(true, saved.ToDto()));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)},{nameof(AppRole.Developer)}")]
    public async Task<ActionResult<ApiResponse<FileDto>>> Update(Guid id, [FromBody] UpdateFileRequest request, CancellationToken cancellationToken)
    {
        var file = await dbContext.Files
            .Include(x => x.Project)
            .Include(x => x.Uploader)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (file is null)
            return NotFound(new ApiResponse<FileDto>(false, null, "File not found."));

        file.Name = request.Name;
        file.FileType = request.FileType;
        file.Url = request.Url;
        file.ProjectId = request.ProjectId;
        file.TaskId = request.TaskId;

        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Files
            .Include(x => x.Project)
            .Include(x => x.Uploader)
            .FirstAsync(x => x.Id == id, cancellationToken);

        return Ok(new ApiResponse<FileDto>(true, saved.ToDto()));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var file = await dbContext.Files.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (file is null)
            return NotFound(new ApiResponse<string>(false, null, "File not found."));

        dbContext.Files.Remove(file);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}
