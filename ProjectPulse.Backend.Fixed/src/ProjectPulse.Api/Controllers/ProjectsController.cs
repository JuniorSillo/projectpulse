using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Projects;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/projects")]
public sealed class ProjectsController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<ProjectListItemDto>>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? risk,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Projects
            .Include(x => x.Manager)
            .Include(x => x.TeamMembers)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || x.Client.Contains(search));

        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<ProjectStatus>(status, true, out var parsedStatus))
            query = query.Where(x => x.Status == parsedStatus);

        if (!string.IsNullOrWhiteSpace(risk) && Enum.TryParse<RiskLevel>(risk, true, out var parsedRisk))
            query = query.Where(x => x.Risk == parsedRisk);

        var items = await query
            .OrderBy(x => x.DueDate)
            .ToListAsync(cancellationToken);

        return Ok(new ApiResponse<IReadOnlyList<ProjectListItemDto>>(true, items.Select(x => x.ToListDto()).ToList()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ProjectDetailsDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .Include(x => x.Manager)
            .Include(x => x.TeamMembers)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (project is null)
            return NotFound(new ApiResponse<ProjectDetailsDto>(false, null, "Project not found."));

        return Ok(new ApiResponse<ProjectDetailsDto>(true, project.ToDetailsDto()));
    }

    [HttpPost]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<ProjectDetailsDto>>> Create([FromBody] CreateProjectRequest request, CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<ProjectStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<ProjectDetailsDto>(false, null, "Invalid project status."));

        if (!Enum.TryParse<RiskLevel>(request.Risk, true, out var risk))
            return BadRequest(new ApiResponse<ProjectDetailsDto>(false, null, "Invalid risk level."));

        var manager = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == request.ManagerId, cancellationToken);
        if (manager is null)
            return BadRequest(new ApiResponse<ProjectDetailsDto>(false, null, "Manager not found."));

        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Client = request.Client,
            ManagerId = request.ManagerId,
            Status = status,
            Progress = request.Progress,
            DueDate = request.DueDate,
            Risk = risk,
            Description = request.Description,
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedAtUtc = DateTime.UtcNow
        };

        dbContext.Projects.Add(project);

        foreach (var teamId in request.TeamIds.Distinct())
        {
            dbContext.ProjectTeamMembers.Add(new ProjectTeamMember
            {
                ProjectId = project.Id,
                UserId = teamId
            });
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Projects
            .Include(x => x.Manager)
            .Include(x => x.TeamMembers)
            .FirstAsync(x => x.Id == project.Id, cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = project.Id }, new ApiResponse<ProjectDetailsDto>(true, saved.ToDetailsDto()));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<ProjectDetailsDto>>> Update(Guid id, [FromBody] UpdateProjectRequest request, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .Include(x => x.TeamMembers)
            .Include(x => x.Manager)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (project is null)
            return NotFound(new ApiResponse<ProjectDetailsDto>(false, null, "Project not found."));

        if (!Enum.TryParse<ProjectStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<ProjectDetailsDto>(false, null, "Invalid project status."));

        if (!Enum.TryParse<RiskLevel>(request.Risk, true, out var risk))
            return BadRequest(new ApiResponse<ProjectDetailsDto>(false, null, "Invalid risk level."));

        project.Name = request.Name;
        project.Client = request.Client;
        project.ManagerId = request.ManagerId;
        project.Status = status;
        project.Progress = request.Progress;
        project.DueDate = request.DueDate;
        project.Risk = risk;
        project.Description = request.Description;
        project.UpdatedAtUtc = DateTime.UtcNow;

        dbContext.ProjectTeamMembers.RemoveRange(project.TeamMembers);
        foreach (var teamId in request.TeamIds.Distinct())
        {
            dbContext.ProjectTeamMembers.Add(new ProjectTeamMember { ProjectId = project.Id, UserId = teamId });
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Projects
            .Include(x => x.Manager)
            .Include(x => x.TeamMembers)
            .FirstAsync(x => x.Id == id, cancellationToken);

        return Ok(new ApiResponse<ProjectDetailsDto>(true, saved.ToDetailsDto()));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (project is null)
            return NotFound(new ApiResponse<string>(false, null, "Project not found."));

        dbContext.Projects.Remove(project);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}
