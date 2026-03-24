using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Models;
using WorkTaskStatus = ProjectPulse.Api.Models.TaskStatus;

namespace ProjectPulse.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectTeamMember> ProjectTeamMembers => Set<ProjectTeamMember>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<Milestone> Milestones => Set<Milestone>();
    public DbSet<FileAsset> Files => Set<FileAsset>();
    public DbSet<Comment> Comments => Set<Comment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<AppRole>();
        modelBuilder.HasPostgresEnum<ProjectStatus>();
        modelBuilder.HasPostgresEnum<WorkTaskStatus>();
        modelBuilder.HasPostgresEnum<PriorityLevel>();
        modelBuilder.HasPostgresEnum<RiskLevel>();
        modelBuilder.HasPostgresEnum<MilestoneStatus>();

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(120).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(200).IsRequired();
            entity.Property(x => x.PasswordHash).IsRequired();
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Token).IsUnique();
            entity.Property(x => x.Token).HasMaxLength(512).IsRequired();
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(160).IsRequired();
            entity.Property(x => x.Client).HasMaxLength(160).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(2000);
            entity.HasOne(x => x.Manager)
                .WithMany(x => x.ManagedProjects)
                .HasForeignKey(x => x.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ProjectTeamMember>(entity =>
        {
            entity.HasKey(x => new { x.ProjectId, x.UserId });

            entity.HasOne(x => x.Project)
                .WithMany(x => x.TeamMembers)
                .HasForeignKey(x => x.ProjectId);

            entity.HasOne(x => x.User)
                .WithMany(x => x.ProjectMemberships)
                .HasForeignKey(x => x.UserId);
        });

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Title).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(2000);
            entity.HasOne(x => x.Assignee)
                .WithMany(x => x.AssignedTasks)
                .HasForeignKey(x => x.AssigneeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Milestone>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Title).HasMaxLength(200).IsRequired();
        });

        modelBuilder.Entity<FileAsset>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(260).IsRequired();
            entity.Property(x => x.FileType).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Url).HasMaxLength(1000).IsRequired();

            entity.HasOne(x => x.Uploader)
                .WithMany(x => x.UploadedFiles)
                .HasForeignKey(x => x.UploaderId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Task)
                .WithMany(x => x.Files)
                .HasForeignKey(x => x.TaskId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.EntityType).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Message).HasMaxLength(2000).IsRequired();

            entity.HasOne(x => x.Author)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}