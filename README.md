# pure-clean

A production-grade Clean Architecture CLI for scaffolding React applications with proper layer separation, dependency injection, and extensibility.

## Quick Start

```bash
npx pure-clean init
```

This will guide you through creating a new project with your preferred:
- Package manager (pnpm, npm, yarn)
- State management (TanStack Query + Zustand, TanStack Query only, Redux Toolkit, or none)
- Development tools (ESLint, Dependency Cruiser)

## Commands

| Command | Description |
|---------|-------------|
| `pure-clean init` | Create a new Clean Architecture project |
| `pure-clean generate <type> <name>` | Generate a code component (feature, entity, repository, service, usecase) |
| `pure-clean update` | Update CLI and templates |
| `pure-clean health` | Check environment and project health |

## Code Generation

```bash
pure-clean generate feature user      # Creates use case, repository, service
pure-clean generate entity product    # Creates entity interface + factory
pure-clean generate repository order  # Creates interface + implementation
pure-clean generate service payment   # Creates service class
pure-clean generate usecase checkout  # Creates use case class
```

## Project Structure

When you run `pure-clean init`, you get a React + Vite project with Clean Architecture:

```
my-project/
├── src/
│   ├── domain/           # Entities, interfaces, business rules
│   ├── application/      # Use cases, service orchestration
│   ├── infrastructure/   # External integrations (API, DB, etc.)
│   └── presentation/     # React components, hooks, pages
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Architecture

This CLI is itself built following Clean Architecture principles. See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## Configuration

Plugins are discovered via `package.json`:

```json
{
  "pure-clean": {
    "plugins": ["my-pure-clean-plugin"]
  }
}
```

## Development

```bash
pnpm install
pnpm dev          # Run CLI in development mode
pnpm build        # Build for production
pnpm typecheck    # Type-check without emitting
```

## License

ISC

## Requirements

- Node >= 18.18
- pnpm

> Maintained with @whydrf/eslint-plugin-nava
