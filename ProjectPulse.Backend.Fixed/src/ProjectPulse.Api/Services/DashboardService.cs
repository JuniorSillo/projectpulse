using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Contracts.Dashboard;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Models;
using WorkTaskStatus = ProjectPulse.Api.Models.TaskStatus;

namespace ProjectPulse.Api.Services;

public sealed class DashboardService(AppDbContext dbContext, IDateTimeProvider dateTimeProvider) : IDashboardService
{
    public async Task<DashboardResponse> GetDashboardAsync(AppRole role, Guid currentUserId, CancellationToken cancellationToken)
    {
        var projectsQuery = dbContext.Projects.AsQueryable();
        var tasksQuery = dbContext.Tasks.AsQueryable();
        var milestonesQuery = dbContext.Milestones.AsQueryable();

        if (role == AppRole.Manager)
        {
            projectsQuery = projectsQuery.Where(x => x.ManagerId == currentUserId);
            tasksQuery = tasksQuery.Where(x => x.Project.ManagerId == currentUserId);
            milestonesQuery = milestonesQuery.Where(x => x.Project.ManagerId == currentUserId);
        }
        else if (role == AppRole.Developer)
        {
            tasksQuery = tasksQuery.Where(x => x.AssigneeId == currentUserId);
            projectsQuery = projectsQuery.Where(x => x.TeamMembers.Any(tm => tm.UserId == currentUserId));
            milestonesQuery = milestonesQuery.Where(x => x.Project.TeamMembers.Any(tm => tm.UserId == currentUserId));
        }
        else if (role == AppRole.Client)
        {
            projectsQuery = projectsQuery.Where(x => x.TeamMembers.Any(tm => tm.UserId == currentUserId));
            milestonesQuery = milestonesQuery.Where(x => x.Project.TeamMembers.Any(tm => tm.UserId == currentUserId));
            tasksQuery = tasksQuery.Where(x => x.Project.TeamMembers.Any(tm => tm.UserId == currentUserId));
        }

        var projects = await projectsQuery.Include(x => x.TeamMembers).ToListAsync(cancellationToken);
        var tasks = await tasksQuery.ToListAsync(cancellationToken);
        var milestones = await milestonesQuery.ToListAsync(cancellationToken);
        var usersCount = await dbContext.Users.CountAsync(cancellationToken);

        var today = DateOnly.FromDateTime(dateTimeProvider.UtcNow);

        var stats = role switch
        {
            AppRole.Admin => new List<StatCardDto>
            {
                new("Total users", usersCount.ToString(), "System-wide users"),
                new("Total projects", projects.Count.ToString(), "All tracked projects"),
                new("Overdue tasks", tasks.Count(x => x.DueDate < today && x.Status != WorkTaskStatus.Done).ToString(), "Requires intervention"),
                new("High-risk projects", projects.Count(x => x.Risk == RiskLevel.High).ToString(), "Escalation needed")
            },
            AppRole.Manager => new List<StatCardDto>
            {
                new("My active projects", projects.Count(x => x.Status == ProjectStatus.Active).ToString(), "Across assigned clients"),
                new("Milestones due", milestones.Count(x => x.DueDate <= DateOnly.FromDateTime(dateTimeProvider.UtcNow.AddDays(7))).ToString(), "This week"),
                new("Overdue tasks", tasks.Count(x => x.DueDate < today && x.Status != WorkTaskStatus.Done).ToString(), "Need follow-up"),
                new("Team workload", $"{Math.Min(100, tasks.Count * 12)}%", "Estimated capacity")
            },
            AppRole.Developer => new List<StatCardDto>
            {
                new("Assigned tasks", tasks.Count.ToString(), "Across active projects"),
                new("Due soon", tasks.Count(x => x.DueDate <= DateOnly.FromDateTime(dateTimeProvider.UtcNow.AddDays(3)) && x.Status != WorkTaskStatus.Done).ToString(), "Next 3 days"),
                new("Completed this week", tasks.Count(x => x.Status == WorkTaskStatus.Done && x.UpdatedAtUtc >= dateTimeProvider.UtcNow.AddDays(-7)).ToString(), "Current week"),
                new("Blocked tasks", tasks.Count(x => x.Status == WorkTaskStatus.Blocked).ToString(), "Needs support")
            },
            _ => new List<StatCardDto>
            {
                new("Active projects", projects.Count(x => x.Status == ProjectStatus.Active).ToString(), "Currently in delivery"),
                new("Current milestone", milestones.OrderBy(x => x.DueDate).FirstOrDefault()?.Title ?? "None", "Nearest checkpoint"),
                new("Completion", projects.Any() ? $"{projects.Average(x => x.Progress):0}%" : "0%", "Average across projects"),
                new("Feedback items", tasks.Count(x => x.Status == WorkTaskStatus.Review).ToString(), "Pending review")
            }
        };

        var primaryChart = projects
            .GroupBy(x => x.Status.ToString())
            .Select(g => new ChartPointDto(g.Key, g.Count()))
            .ToList();

        var secondaryChart = role switch
        {
            AppRole.Admin => await dbContext.Users
                .GroupBy(x => x.Role.ToString())
                .Select(g => new ChartPointDto(g.Key, g.Count()))
                .ToListAsync(cancellationToken),

            _ => milestones
                .Select(x => new ChartPointDto(
                    x.Title.Split(' ')[0],
                    role == AppRole.Manager ? 100 - x.Progress : x.Progress))
                .ToList()
        };

        var activity = await dbContext.Comments
            .Include(x => x.Author)
            .OrderByDescending(x => x.CreatedAtUtc)
            .Take(6)
            .Select(x => new ActivityItemDto(x.Author.Name, x.Message, x.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return new DashboardResponse(stats, primaryChart, secondaryChart, activity);
    }
}