using ProjectPulse.Api.Contracts.Comments;
using ProjectPulse.Api.Contracts.Files;
using ProjectPulse.Api.Contracts.Milestones;
using ProjectPulse.Api.Contracts.Projects;
using ProjectPulse.Api.Contracts.Tasks;
using ProjectPulse.Api.Contracts.Users;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Mapping;

public static class EntityMappingExtensions
{
    public static UserDto ToDto(this AppUser user) =>
        new(
            user.Id,
            user.Name,
            user.Email,
            user.Role.ToString(),
            user.IsActive,
            user.ProjectsAssigned,
            user.LastActiveUtc
        );

    public static ProjectListItemDto ToListDto(this Project project) =>
        new(
            project.Id,
            project.Name,
            project.Client,
            project.ManagerId,
            project.Manager.Name,
            project.Status.ToString(),
            project.Progress,
            project.DueDate,
            project.Risk.ToString()
        );

    public static ProjectDetailsDto ToDetailsDto(this Project project) =>
        new(
            project.Id,
            project.Name,
            project.Client,
            project.ManagerId,
            project.Manager.Name,
            project.Status.ToString(),
            project.Progress,
            project.DueDate,
            project.Risk.ToString(),
            project.Description,
            project.TeamMembers.Select(x => x.UserId).ToList()
        );

    public static TaskListItemDto ToListDto(this TaskItem task) =>
        new(
            task.Id,
            task.Title,
            task.ProjectId,
            task.Project.Name,
            task.AssigneeId,
            task.Assignee.Name,
            task.Status.ToString(),
            task.Priority.ToString(),
            task.DueDate
        );

    public static TaskDetailsDto ToDetailsDto(this TaskItem task) =>
        new(
            task.Id,
            task.Title,
            task.ProjectId,
            task.Project.Name,
            task.AssigneeId,
            task.Assignee.Name,
            task.Status.ToString(),
            task.Priority.ToString(),
            task.DueDate,
            task.Description
        );

    public static MilestoneDto ToDto(this Milestone milestone) =>
        new(
            milestone.Id,
            milestone.ProjectId,
            milestone.Project.Name,
            milestone.Title,
            milestone.DueDate,
            milestone.Progress,
            milestone.Status.ToString()
        );

    public static FileDto ToDto(this FileAsset file) =>
        new(
            file.Id,
            file.Name,
            file.FileType,
            file.Url,
            file.ProjectId,
            file.Project.Name,
            file.TaskId,
            file.UploaderId,
            file.Uploader.Name,
            file.UploadedAtUtc
        );

    public static CommentDto ToDto(this Comment comment) =>
        new(
            comment.Id,
            comment.EntityId,
            comment.EntityType,
            comment.AuthorId,
            comment.Author.Name,
            comment.Message,
            comment.CreatedAtUtc
        );
}
