namespace ProjectPulse.Api.Contracts.Dashboard;

public sealed record StatCardDto(string Label, string Value, string Helper);

public sealed record ChartPointDto(string Name, int Value);

public sealed record TrendPointDto(string Week, int Progress);

public sealed record ActivityItemDto(string AuthorName, string Message, DateTime CreatedAtUtc);

public sealed record DashboardResponse(
    IReadOnlyList<StatCardDto> Stats,
    IReadOnlyList<ChartPointDto> PrimaryChart,
    IReadOnlyList<ChartPointDto> SecondaryChart,
    IReadOnlyList<ActivityItemDto> Activity
);
