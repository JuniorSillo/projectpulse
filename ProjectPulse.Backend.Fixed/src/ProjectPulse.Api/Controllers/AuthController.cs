using Microsoft.AspNetCore.Mvc;
using ProjectPulse.Api.Common;
using ProjectPulse.Api.Contracts.Auth;
using ProjectPulse.Api.Services;

namespace ProjectPulse.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var response = await authService.LoginAsync(request.Email, request.Password, cancellationToken);
        if (response is null)
            return Unauthorized(new ApiResponse<AuthResponse>(false, null, "Invalid credentials."));

        return Ok(new ApiResponse<AuthResponse>(true, response));
    }

    [HttpPost("refresh")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<AuthResponse>), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var response = await authService.RefreshAsync(request.RefreshToken, cancellationToken);
        if (response is null)
            return Unauthorized(new ApiResponse<AuthResponse>(false, null, "Invalid refresh token."));

        return Ok(new ApiResponse<AuthResponse>(true, response));
    }

    [HttpPost("revoke")]
    [ProducesResponseType(typeof(ApiResponse<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Revoke([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var revoked = await authService.RevokeRefreshTokenAsync(request.RefreshToken, cancellationToken);
        if (!revoked)
            return BadRequest(new ApiResponse<string>(false, null, "Refresh token could not be revoked."));

        return Ok(new ApiResponse<string>(true, "Revoked"));
    }
}
