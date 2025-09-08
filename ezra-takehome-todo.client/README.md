# Todo Application

A full-stack todo application with .NET Core backend and React frontend.

## Tech Stack

**Backend**: .NET Core 8, Entity Framework Core, SQLite, JWT Authentication  
**Frontend**: React 19, TypeScript, Material-UI, Auth0  
**Testing**: Playwright, MSW

## Setup

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm
- Visual Studio 2022 or VS Code

### Running the Project

1. **Open the solution** in Visual Studio or VS Code
2. **Set up the database** (first time only):
   ```bash
   cd ezra-takehome-todo.Server
   dotnet tool install --global dotnet-ef
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
3. **Start the backend** - Run the `ezra-takehome-todo.Server` project
   - API available at: `https://localhost:7038`
   - Swagger UI available at: `https://localhost:7038/swagger`
4. **Start the frontend** - Run the `ezra-takehome-todo.client` project
   - App available at: `https://localhost:59739`

### Auth0 Setup
1. Create Auth0 SPA application
2. Set callback URLs to `https://localhost:59739`
3. Create API with identifier `https://localhost:7038/api`

### Tests
```bash
cd ezra-takehome-todo.client
npm run test:e2e
```

## API Endpoints

All endpoints require JWT authentication:
- `GET /api/Todo` - Get user's todos
- `POST /api/Todo` - Create todo
- `PUT /api/Todo/{id}` - Toggle completion
- `DELETE /api/Todo/{id}` - Delete todo

## Features

- User authentication with Auth0
- CRUD operations for todos
- User-scoped data isolation
- Search and filter functionality
- Responsive design

## Architecture Decisions

**Backend**: Entity Framework Core with SQLite for rapid development. JWT authentication for stateless security. User-scoped data filtering for isolation.

**Frontend**: React with TypeScript for type safety. Material-UI for consistent UI. Custom hooks for API communication. Component composition for maintainability.

**Testing**: Playwright for E2E testing. MSW for API mocking to avoid backend dependencies.

## Trade-offs

- **SQLite over PostgreSQL**: Simpler for development, but not production-ready
- **Auth0 over custom auth**: Faster implementation, less control
- **MSW over real API**: More reliable tests, but not testing real integration
- **Material-UI over custom CSS**: Faster development, less design flexibility

## Assumptions

- Single user session per browser
- Localhost development environment
- Small to medium user load
- No real-time collaboration required
- Auth0 service availability

## Future Improvements

- Migrate to PostgreSQL for production
- Add database indexing and caching
- Implement real-time updates with WebSockets
- Add comprehensive input validation
- Set up CI/CD pipeline

## Thought Process

When approaching this take-home:

1.  **Started with Backend** -- built a minimal but extendable API with
    CRUD operations, keeping in mind how it would scale with a real
    database.
2.  **Implemented Frontend** -- focused on clear UI state management
    with React hooks and TypeScript interfaces and MUI for huge component ready with accessibility in mind. 
3.  **Connected Both Sides** -- ensured smooth JSON communication and
    tested round-trip interactions.
4.  **Added Tests** -- end to end test using playwright to ensure correct business flow
