using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjectPulse.Api.Contracts.Auth;
using ProjectPulse.Api.Data;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Services;

public sealed class AuthService(
    AppDbContext dbContext,
    ITokenService tokenService,
    IDateTimeProvider dateTimeProvider) : IAuthService
{
    private readonly PasswordHasher<AppUser> _passwordHasher = new();

    public async Task<AuthResponse?> LoginAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .Include(x => x.RefreshTokens)
            .FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower(), cancellationToken);

        if (user is null || !user.IsActive)
            return null;

        var verification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (verification is PasswordVerificationResult.Failed)
            return null;

        user.LastActiveUtc = dateTimeProvider.UtcNow;

        var refreshToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = tokenService.CreateRefreshToken(),
            UserId = user.Id,
            CreatedAtUtc = dateTimeProvider.UtcNow,
            ExpiresAtUtc = tokenService.GetRefreshTokenExpiryUtc()
        };

        dbContext.RefreshTokens.Add(refreshToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResponse(
            tokenService.CreateAccessToken(user),
            refreshToken.Token,
            tokenService.GetAccessTokenExpiryUtc(),
            user.Id,
            user.Name,
            user.Email,
            user.Role.ToString());
    }

    public async Task<AuthResponse?> RefreshAsync(string refreshToken, CancellationToken cancellationToken)
    {
        var token = await dbContext.RefreshTokens
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Token == refreshToken, cancellationToken);

        if (token is null || !token.IsActive || !token.User.IsActive)
            return null;

        token.RevokedAtUtc = dateTimeProvider.UtcNow;

        var newToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = tokenService.CreateRefreshToken(),
            UserId = token.UserId,
            CreatedAtUtc = dateTimeProvider.UtcNow,
            ExpiresAtUtc = tokenService.GetRefreshTokenExpiryUtc()
        };

        dbContext.RefreshTokens.Add(newToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResponse(
            tokenService.CreateAccessToken(token.User),
            newToken.Token,
            tokenService.GetAccessTokenExpiryUtc(),
            token.User.Id,
            token.User.Name,
            token.User.Email,
            token.User.Role.ToString());
    }

    public async Task<bool> RevokeRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken)
    {
        var token = await dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == refreshToken, cancellationToken);

        if (token is null || token.RevokedAtUtc is not null)
            return false;

        token.RevokedAtUtc = dateTimeProvider.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}
