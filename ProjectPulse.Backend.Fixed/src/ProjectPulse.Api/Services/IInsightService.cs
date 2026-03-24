using ProjectPulse.Api.Contracts.Insights;

namespace ProjectPulse.Api.Services;

public interface IInsightService
{
    Task<IReadOnlyList<InsightDto>> GetInsightsAsync(CancellationToken cancellationToken);
}
