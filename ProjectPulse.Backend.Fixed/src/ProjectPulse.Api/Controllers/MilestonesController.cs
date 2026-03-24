using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Milestones;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/milestones")]
public sealed class MilestonesController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<MilestoneDto>>>> GetAll([FromQuery] Guid? projectId, CancellationToken cancellationToken)
    {
        var query = dbContext.Milestones.Include(x => x.Project).AsQueryable();
        if (projectId.HasValue) query = query.Where(x => x.ProjectId == projectId.Value);

        var items = await query.OrderBy(x => x.DueDate).ToListAsync(cancellationToken);
        return Ok(new ApiResponse<IReadOnlyList<MilestoneDto>>(true, items.Select(x => x.ToDto()).ToList()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<MilestoneDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var item = await dbContext.Milestones.Include(x => x.Project).FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<MilestoneDto>(false, null, "Milestone not found."));

        return Ok(new ApiResponse<MilestoneDto>(true, item.ToDto()));
    }

    [HttpPost]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<MilestoneDto>>> Create([FromBody] CreateMilestoneRequest request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<MilestoneStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<MilestoneDto>(false, null, "Invalid milestone status."));

        if (!await dbContext.Projects.AnyAsync(x => x.Id == request.ProjectId, cancellationToken))
            return BadRequest(new ApiResponse<MilestoneDto>(false, null, "Project not found."));

        var item = new Milestone
        {
            Id = Guid.NewGuid(),
            ProjectId = request.ProjectId,
            Title = request.Title,
            DueDate = request.DueDate,
            Progress = request.Progress,
            Status = status,
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedAtUtc = DateTime.UtcNow
        };

        dbContext.Milestones.Add(item);
        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Milestones.Include(x => x.Project).FirstAsync(x => x.Id == item.Id, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, new ApiResponse<MilestoneDto>(true, saved.ToDto()));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<MilestoneDto>>> Update(Guid id, [FromBody] UpdateMilestoneRequest request, CancellationToken cancellationToken)
    {
        var item = await dbContext.Milestones.Include(x => x.Project).FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<MilestoneDto>(false, null, "Milestone not found."));

        if (!Enum.TryParse<MilestoneStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<MilestoneDto>(false, null, "Invalid milestone status."));

        item.ProjectId = request.ProjectId;
        item.Title = request.Title;
        item.DueDate = request.DueDate;
        item.Progress = request.Progress;
        item.Status = status;
        item.UpdatedAtUtc = DateTime.UtcNow;

        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Milestones.Include(x => x.Project).FirstAsync(x => x.Id == id, cancellationToken);
        return Ok(new ApiResponse<MilestoneDto>(true, saved.ToDto()));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var item = await dbContext.Milestones.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<string>(false, null, "Milestone not found."));

        dbContext.Milestones.Remove(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}
