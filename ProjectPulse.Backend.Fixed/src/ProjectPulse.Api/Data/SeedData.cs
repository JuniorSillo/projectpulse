using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Models;
using WorkTaskStatus = ProjectPulse.Api.Models.TaskStatus;

namespace ProjectPulse.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (await db.Users.AnyAsync())
            return;

        var hasher = new PasswordHasher<AppUser>();

        var admin = new AppUser
        {
            Id = Guid.NewGuid(),
            Name = "Admin User",
            Email = "admin@projectpulse.io",
            Role = AppRole.Admin,
            ProjectsAssigned = 5,
            LastActiveUtc = DateTime.UtcNow.AddHours(-1)
        };

        var manager = new AppUser
        {
            Id = Guid.NewGuid(),
            Name = "Mason Lee",
            Email = "manager@projectpulse.io",
            Role = AppRole.Manager,
            ProjectsAssigned = 4,
            LastActiveUtc = DateTime.UtcNow.AddHours(-2)
        };

        var developer = new AppUser
        {
            Id = Guid.NewGuid(),
            Name = "Lebo Mokoena",
            Email = "developer@projectpulse.io",
            Role = AppRole.Developer,
            ProjectsAssigned = 6,
            LastActiveUtc = DateTime.UtcNow.AddHours(-5)
        };

        var client = new AppUser
        {
            Id = Guid.NewGuid(),
            Name = "Nina Patel",
            Email = "client@projectpulse.io",
            Role = AppRole.Client,
            ProjectsAssigned = 2,
            LastActiveUtc = DateTime.UtcNow.AddDays(-1)
        };

        foreach (var user in new[] { admin, manager, developer, client })
        {
            user.PasswordHash = hasher.HashPassword(user, "Password123!");
        }

        var project1 = new Project
        {
            Id = Guid.NewGuid(),
            Name = "Apollo Commerce Suite",
            Client = "Northstar Retail",
            ManagerId = manager.Id,
            Status = ProjectStatus.Active,
            Progress = 72,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(25)),
            Risk = RiskLevel.High,
            Description = "Modern omnichannel commerce platform with analytics and loyalty modules."
        };

        var project2 = new Project
        {
            Id = Guid.NewGuid(),
            Name = "Orion Client Portal",
            Client = "Helix Capital",
            ManagerId = manager.Id,
            Status = ProjectStatus.Review,
            Progress = 88,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(7)),
            Risk = RiskLevel.Moderate,
            Description = "Secure reporting and approvals portal for client servicing teams."
        };

        var project3 = new Project
        {
            Id = Guid.NewGuid(),
            Name = "Nimbus Support Hub",
            Client = "Vertex Health",
            ManagerId = manager.Id,
            Status = ProjectStatus.Planning,
            Progress = 24,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(60)),
            Risk = RiskLevel.Low,
            Description = "Self-service support experience with knowledge management and workflows."
        };

        var members = new List<ProjectTeamMember>
        {
            new() { ProjectId = project1.Id, UserId = manager.Id },
            new() { ProjectId = project1.Id, UserId = developer.Id },
            new() { ProjectId = project1.Id, UserId = client.Id },
            new() { ProjectId = project2.Id, UserId = manager.Id },
            new() { ProjectId = project2.Id, UserId = developer.Id },
            new() { ProjectId = project2.Id, UserId = client.Id },
            new() { ProjectId = project3.Id, UserId = manager.Id },
            new() { ProjectId = project3.Id, UserId = developer.Id }
        };

        var milestone1 = new Milestone
        {
            Id = Guid.NewGuid(),
            ProjectId = project1.Id,
            Title = "API Integration",
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(5)),
            Progress = 60,
            Status = MilestoneStatus.AtRisk
        };

        var milestone2 = new Milestone
        {
            Id = Guid.NewGuid(),
            ProjectId = project1.Id,
            Title = "Admin Console Release",
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(17)),
            Progress = 80,
            Status = MilestoneStatus.OnTrack
        };

        var milestone3 = new Milestone
        {
            Id = Guid.NewGuid(),
            ProjectId = project2.Id,
            Title = "Client UAT",
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(4)),
            Progress = 92,
            Status = MilestoneStatus.OnTrack
        };

        var task1 = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Build dashboard KPI endpoints",
            ProjectId = project1.Id,
            AssigneeId = developer.Id,
            Status = WorkTaskStatus.InProgress,
            Priority = PriorityLevel.Critical,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
            Description = "Create metrics pipeline and response contracts for dashboard cards."
        };

        var task2 = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Refine billing workflow UI",
            ProjectId = project1.Id,
            AssigneeId = developer.Id,
            Status = WorkTaskStatus.Review,
            Priority = PriorityLevel.High,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(2)),
            Description = "Polish user flow and align controls with finance approval states."
        };

        var task3 = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Prepare UAT checklist",
            ProjectId = project2.Id,
            AssigneeId = manager.Id,
            Status = WorkTaskStatus.Todo,
            Priority = PriorityLevel.Medium,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow),
            Description = "Document acceptance checklist for client review and signoff."
        };

        var task4 = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Fix document upload validation",
            ProjectId = project2.Id,
            AssigneeId = developer.Id,
            Status = WorkTaskStatus.Blocked,
            Priority = PriorityLevel.High,
            DueDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)),
            Description = "Resolve file size validation mismatch with drag-and-drop flow."
        };

        var file1 = new FileAsset
        {
            Id = Guid.NewGuid(),
            Name = "Sprint-Plan-Q2.pdf",
            FileType = "PDF",
            Url = "https://files.projectpulse.local/sprint-plan-q2.pdf",
            ProjectId = project1.Id,
            UploaderId = manager.Id,
            UploadedAtUtc = DateTime.UtcNow.AddDays(-6)
        };

        var file2 = new FileAsset
        {
            Id = Guid.NewGuid(),
            Name = "UAT-Checklist.docx",
            FileType = "DOCX",
            Url = "https://files.projectpulse.local/uat-checklist.docx",
            ProjectId = project2.Id,
            TaskId = task3.Id,
            UploaderId = manager.Id,
            UploadedAtUtc = DateTime.UtcNow.AddDays(-2)
        };

        var comment1 = new Comment
        {
            Id = Guid.NewGuid(),
            EntityId = project1.Id,
            EntityType = "Project",
            AuthorId = manager.Id,
            Message = "Payments scope expanded after stakeholder review. Monitoring risk closely.",
            CreatedAtUtc = DateTime.UtcNow.AddDays(-2)
        };

        var comment2 = new Comment
        {
            Id = Guid.NewGuid(),
            EntityId = task4.Id,
            EntityType = "Task",
            AuthorId = developer.Id,
            Message = "Blocked by missing content type contract from backend team.",
            CreatedAtUtc = DateTime.UtcNow.AddHours(-8)
        };

        db.Users.AddRange(admin, manager, developer, client);
        db.Projects.AddRange(project1, project2, project3);
        db.ProjectTeamMembers.AddRange(members);
        db.Milestones.AddRange(milestone1, milestone2, milestone3);
        db.Tasks.AddRange(task1, task2, task3, task4);
        db.Files.AddRange(file1, file2);
        db.Comments.AddRange(comment1, comment2);

        await db.SaveChangesAsync();
    }
}