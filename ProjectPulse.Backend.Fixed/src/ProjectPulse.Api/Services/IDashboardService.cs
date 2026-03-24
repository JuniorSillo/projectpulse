using ProjectPulse.Api.Contracts.Dashboard;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Services;

public interface IDashboardService
{
    Task<DashboardResponse> GetDashboardAsync(AppRole role, Guid currentUserId, CancellationToken cancellationToken);
}
