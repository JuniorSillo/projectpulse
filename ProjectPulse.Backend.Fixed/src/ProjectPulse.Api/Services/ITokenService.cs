using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Services;

public interface ITokenService
{
    string CreateAccessToken(AppUser user);
    string CreateRefreshToken();
    DateTime GetAccessTokenExpiryUtc();
    DateTime GetRefreshTokenExpiryUtc();
}
