# ProjectPulse Backend

Production-oriented ASP.NET Core 8 Web API for the ProjectPulse frontend.

## Features
- JWT access tokens + refresh tokens
- PostgreSQL with EF Core
- Full CRUD for projects, tasks, milestones, files, comments, users
- Role-based authorization (Admin, Manager, Developer, Client)
- Dashboard endpoints for all frontend dashboards
- Insights endpoint
- Seeded demo data and demo users
- Swagger with JWT support
- CORS enabled for local frontend development

## Demo users
- admin@projectpulse.io / Password123!
- manager@projectpulse.io / Password123!
- developer@projectpulse.io / Password123!
- client@projectpulse.io / Password123!

## Run with Docker PostgreSQL
1. Start PostgreSQL:
   ```bash
   docker compose up -d
   ```
2. Update `appsettings.Development.json` if needed.
3. Run the API:
   ```bash
   dotnet restore
   dotnet run --project src/ProjectPulse.Api
   ```

Swagger:
- https://localhost:7143/swagger
- http://localhost:5143/swagger

## Notes
- The app uses `Database.EnsureCreated()` on startup so the schema is created automatically.
- For long-term production, switch to EF Core migrations and move secrets to environment variables or a secret store.


## Run from the project folder
From the repo root, use:
```bash
dotnet restore src/ProjectPulse.Api/ProjectPulse.Api.csproj
dotnet run --project src/ProjectPulse.Api/ProjectPulse.Api.csproj
```

PostgreSQL is mapped to port `5433` to avoid conflicts with an existing local Postgres instance.
