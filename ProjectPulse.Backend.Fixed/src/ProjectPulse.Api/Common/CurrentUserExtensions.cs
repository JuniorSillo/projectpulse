using System.Security.Claims;
using ProjectPulse.Api.Models;

namespace ProjectPulse.Api.Common;

public static class CurrentUserExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var raw = user.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? user.FindFirstValue("sub")
                  ?? throw new InvalidOperationException("User id claim is missing.");
        return Guid.Parse(raw);
    }

    public static AppRole GetRole(this ClaimsPrincipal user)
    {
        var raw = user.FindFirstValue(ClaimTypes.Role)
                  ?? throw new InvalidOperationException("Role claim is missing.");
        return Enum.Parse<AppRole>(raw, true);
    }
}
