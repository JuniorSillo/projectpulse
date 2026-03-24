using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Tasks;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;
using WorkTaskStatus = ProjectPulse.Api.Models.TaskStatus;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/tasks")]
public sealed class TasksController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<TaskListItemDto>>>> GetAll(
        [FromQuery] Guid? projectId,
        [FromQuery] Guid? assigneeId,
        [FromQuery] string? status,
        [FromQuery] string? priority,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Tasks
            .Include(x => x.Project)
            .Include(x => x.Assignee)
            .AsQueryable();

        if (projectId.HasValue)
            query = query.Where(x => x.ProjectId == projectId.Value);

        if (assigneeId.HasValue)
            query = query.Where(x => x.AssigneeId == assigneeId.Value);

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<WorkTaskStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(x => x.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(priority) &&
            Enum.TryParse<PriorityLevel>(priority, true, out var parsedPriority))
        {
            query = query.Where(x => x.Priority == parsedPriority);
        }

        var tasks = await query.OrderBy(x => x.DueDate).ToListAsync(cancellationToken);

        return Ok(new ApiResponse<IReadOnlyList<TaskListItemDto>>(
            true,
            tasks.Select(x => x.ToListDto()).ToList()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TaskDetailsDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var task = await dbContext.Tasks
            .Include(x => x.Project)
            .Include(x => x.Assignee)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (task is null)
            return NotFound(new ApiResponse<TaskDetailsDto>(false, null, "Task not found."));

        return Ok(new ApiResponse<TaskDetailsDto>(true, task.ToDetailsDto()));
    }

    [HttpPost]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<TaskDetailsDto>>> Create(
        [FromBody] CreateTaskRequest request,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<WorkTaskStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<TaskDetailsDto>(false, null, "Invalid task status."));

        if (!Enum.TryParse<PriorityLevel>(request.Priority, true, out var priority))
            return BadRequest(new ApiResponse<TaskDetailsDto>(false, null, "Invalid priority."));

        var projectExists = await dbContext.Projects.AnyAsync(x => x.Id == request.ProjectId, cancellationToken);
        var assigneeExists = await dbContext.Users.AnyAsync(x => x.Id == request.AssigneeId, cancellationToken);

        if (!projectExists || !assigneeExists)
            return BadRequest(new ApiResponse<TaskDetailsDto>(false, null, "Project or assignee was not found."));

        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            ProjectId = request.ProjectId,
            AssigneeId = request.AssigneeId,
            Status = status,
            Priority = priority,
            DueDate = request.DueDate,
            Description = request.Description,
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedAtUtc = DateTime.UtcNow
        };

        dbContext.Tasks.Add(task);
        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Tasks
            .Include(x => x.Project)
            .Include(x => x.Assignee)
            .FirstAsync(x => x.Id == task.Id, cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = task.Id },
            new ApiResponse<TaskDetailsDto>(true, saved.ToDetailsDto()));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)},{nameof(AppRole.Developer)}")]
    public async Task<ActionResult<ApiResponse<TaskDetailsDto>>> Update(
        Guid id,
        [FromBody] UpdateTaskRequest request,
        CancellationToken cancellationToken)
    {
        var task = await dbContext.Tasks
            .Include(x => x.Project)
            .Include(x => x.Assignee)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (task is null)
            return NotFound(new ApiResponse<TaskDetailsDto>(false, null, "Task not found."));

        if (!Enum.TryParse<WorkTaskStatus>(request.Status, true, out var status))
            return BadRequest(new ApiResponse<TaskDetailsDto>(false, null, "Invalid task status."));

        if (!Enum.TryParse<PriorityLevel>(request.Priority, true, out var priority))
            return BadRequest(new ApiResponse<TaskDetailsDto>(false, null, "Invalid priority."));

        task.Title = request.Title;
        task.ProjectId = request.ProjectId;
        task.AssigneeId = request.AssigneeId;
        task.Status = status;
        task.Priority = priority;
        task.DueDate = request.DueDate;
        task.Description = request.Description;
        task.UpdatedAtUtc = DateTime.UtcNow;

        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Tasks
            .Include(x => x.Project)
            .Include(x => x.Assignee)
            .FirstAsync(x => x.Id == id, cancellationToken);

        return Ok(new ApiResponse<TaskDetailsDto>(true, saved.ToDetailsDto()));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var task = await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (task is null)
            return NotFound(new ApiResponse<string>(false, null, "Task not found."));

        dbContext.Tasks.Remove(task);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}