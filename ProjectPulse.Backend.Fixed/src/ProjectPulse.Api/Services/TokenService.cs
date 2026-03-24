using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Services;

public sealed class TokenService(IConfiguration configuration, IDateTimeProvider dateTimeProvider) : ITokenService
{
    public string CreateAccessToken(AppUser user)
    {
        var jwt = configuration.GetSection("Jwt");
        var key = jwt["Key"] ?? throw new InvalidOperationException("JWT key is missing.");

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role.ToString())
        };

        var creds = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256);

        var expires = GetAccessTokenExpiryUtc();

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            notBefore: dateTimeProvider.UtcNow,
            expires: expires,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string CreateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes);
    }

    public DateTime GetAccessTokenExpiryUtc()
    {
        var minutes = configuration.GetValue<int>("Jwt:AccessTokenMinutes");
        return dateTimeProvider.UtcNow.AddMinutes(minutes);
    }

    public DateTime GetRefreshTokenExpiryUtc()
    {
        var days = configuration.GetValue<int>("Jwt:RefreshTokenDays");
        return dateTimeProvider.UtcNow.AddDays(days);
    }
}
