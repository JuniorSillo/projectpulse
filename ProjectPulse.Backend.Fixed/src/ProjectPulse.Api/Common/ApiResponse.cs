namespace ProjectPulse.Api.Common;

public sealed record ApiResponse<T>(bool Success, T? Data, string? Message = null);
