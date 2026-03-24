using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Dashboard;
using ProjectPulse.Api.Models;
using ProjectPulse.Api.Services;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/dashboard")]
public sealed class DashboardController(IDashboardService dashboardService) : ControllerBase
{
    [HttpGet("admin")]
    [Authorize(Roles = nameof(AppRole.Admin))]
    public async Task<ActionResult<ApiResponse<DashboardResponse>>> Admin(CancellationToken cancellationToken) =>
        Ok(new ApiResponse<DashboardResponse>(true, await dashboardService.GetDashboardAsync(AppRole.Admin, User.GetUserId(), cancellationToken)));

    [HttpGet("manager")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Manager)}")]
    public async Task<ActionResult<ApiResponse<DashboardResponse>>> Manager(CancellationToken cancellationToken) =>
        Ok(new ApiResponse<DashboardResponse>(true, await dashboardService.GetDashboardAsync(AppRole.Manager, User.GetUserId(), cancellationToken)));

    [HttpGet("developer")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Developer)}")]
    public async Task<ActionResult<ApiResponse<DashboardResponse>>> Developer(CancellationToken cancellationToken) =>
        Ok(new ApiResponse<DashboardResponse>(true, await dashboardService.GetDashboardAsync(AppRole.Developer, User.GetUserId(), cancellationToken)));

    [HttpGet("client")]
    [Authorize(Roles = $"{nameof(AppRole.Admin)},{nameof(AppRole.Client)}")]
    public async Task<ActionResult<ApiResponse<DashboardResponse>>> Client(CancellationToken cancellationToken) =>
        Ok(new ApiResponse<DashboardResponse>(true, await dashboardService.GetDashboardAsync(AppRole.Client, User.GetUserId(), cancellationToken)));
}
