using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Insights;
using ProjectPulse.Api.Services;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/insights")]
public sealed class InsightsController(IInsightService insightService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IReadOnlyList<InsightDto>>>> Get(CancellationToken cancellationToken)
    {
        var items = await insightService.GetInsightsAsync(cancellationToken);
        return Ok(new ApiResponse<IReadOnlyList<InsightDto>>(true, items));
    }
}
