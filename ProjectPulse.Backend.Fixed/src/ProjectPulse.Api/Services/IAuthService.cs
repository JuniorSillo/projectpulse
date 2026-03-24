using ProjectPulse.Api.Contracts.Auth;

namespace ProjectPulse.Api.Services;

public interface IAuthService
{
    Task<AuthResponse?> LoginAsync(string email, string password, CancellationToken cancellationToken);
    Task<AuthResponse?> RefreshAsync(string refreshToken, CancellationToken cancellationToken);
    Task<bool> RevokeRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken);
}
