using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Contracts.Insights;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Models;
using WorkTaskStatus = ProjectPulse.Api.Models.TaskStatus;

namespace ProjectPulse.Api.Services;

public sealed class InsightService(AppDbContext dbContext) : IInsightService
{
    public async Task<IReadOnlyList<InsightDto>> GetInsightsAsync(CancellationToken cancellationToken)
    {
        var highRiskProjects = await dbContext.Projects
            .Where(x => x.Risk == RiskLevel.High)
            .ToListAsync(cancellationToken);

        var blockedTasks = await dbContext.Tasks
            .Where(x => x.Status == WorkTaskStatus.Blocked)
            .ToListAsync(cancellationToken);

        var dueMilestones = await dbContext.Milestones
            .Include(x => x.Project)
            .OrderBy(x => x.DueDate)
            .Take(5)
            .ToListAsync(cancellationToken);

        var insights = new List<InsightDto>();

        if (highRiskProjects.Count > 0)
        {
            insights.Add(new InsightDto(
                "High-risk project alert",
                $"{highRiskProjects[0].Name} is marked high risk and needs immediate delivery attention.",
                "High"));
        }

        if (blockedTasks.Count > 0)
        {
            insights.Add(new InsightDto(
                "Blocked task pressure",
                $"{blockedTasks.Count} task(s) are currently blocked and may affect delivery velocity.",
                "Medium"));
        }

        if (dueMilestones.Count > 0)
        {
            var next = dueMilestones[0];

            insights.Add(new InsightDto(
                "Upcoming milestone",
                $"{next.Title} for {next.Project.Name} is due on {next.DueDate}.",
                "Low"));
        }

        if (insights.Count == 0)
        {
            insights.Add(new InsightDto(
                "No critical signals",
                "No urgent risks were detected in the current portfolio.",
                "Low"));
        }

        return insights;
    }
}