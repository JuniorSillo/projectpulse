using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Comments;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Mapping;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/comments")]
public sealed class CommentsController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<CommentDto>>>> GetAll(
        [FromQuery] Guid? entityId,
        [FromQuery] string? entityType,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Comments.Include(x => x.Author).AsQueryable();

        if (entityId.HasValue)
            query = query.Where(x => x.EntityId == entityId.Value);

        if (!string.IsNullOrWhiteSpace(entityType))
            query = query.Where(x => x.EntityType == entityType);

        var items = await query.OrderByDescending(x => x.CreatedAtUtc).ToListAsync(cancellationToken);
        return Ok(new ApiResponse<IReadOnlyList<CommentDto>>(true, items.Select(x => x.ToDto()).ToList()));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<CommentDto>>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var item = await dbContext.Comments.Include(x => x.Author).FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<CommentDto>(false, null, "Comment not found."));

        return Ok(new ApiResponse<CommentDto>(true, item.ToDto()));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<CommentDto>>> Create([FromBody] CreateCommentRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = User.GetUserId();

        var item = new Comment
        {
            Id = Guid.NewGuid(),
            EntityId = request.EntityId,
            EntityType = request.EntityType,
            AuthorId = currentUserId,
            Message = request.Message,
            CreatedAtUtc = DateTime.UtcNow
        };

        dbContext.Comments.Add(item);
        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Comments.Include(x => x.Author).FirstAsync(x => x.Id == item.Id, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, new ApiResponse<CommentDto>(true, saved.ToDto()));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<CommentDto>>> Update(Guid id, [FromBody] UpdateCommentRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = User.GetUserId();
        var currentRole = User.GetRole();

        var item = await dbContext.Comments.Include(x => x.Author).FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<CommentDto>(false, null, "Comment not found."));

        if (item.AuthorId != currentUserId && currentRole != AppRole.Admin)
            return Forbid();

        item.Message = request.Message;
        await dbContext.SaveChangesAsync(cancellationToken);

        var saved = await dbContext.Comments.Include(x => x.Author).FirstAsync(x => x.Id == id, cancellationToken);
        return Ok(new ApiResponse<CommentDto>(true, saved.ToDto()));
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(Guid id, CancellationToken cancellationToken)
    {
        var currentUserId = User.GetUserId();
        var currentRole = User.GetRole();

        var item = await dbContext.Comments.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (item is null)
            return NotFound(new ApiResponse<string>(false, null, "Comment not found."));

        if (item.AuthorId != currentUserId && currentRole != AppRole.Admin)
            return Forbid();

        dbContext.Comments.Remove(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok(new ApiResponse<string>(true, "Deleted"));
    }
}
