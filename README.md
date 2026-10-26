# Dexhelper

Dexhelper is a React-based web application designed as a Pokédex helper, likely for older generations of Pokémon games (Gen 1 and Gen 2). It includes features for parsing game saves, providing assistance for catching Pokémon, and viewing Pokémon details.

## Prerequisites

- Node.js >=24.0.0
- pnpm >=11.21.0

## Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting. A pre-commit hook is enforced via [Lefthook](https://github.com/evilmartians/lefthook) to ensure code quality before pushing.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```


## Deployment

Dexhelper is configured to be seamlessly deployed on Cloudflare Pages. The Vite configuration dynamically adjusts the base path to `/` when deployed via Cloudflare Pages (`CF_PAGES='true'`), overriding the default `/dexhelper/` base path used for GitHub Pages.


## Development and Testing

- Run unit tests: `pnpm test`
- Run Playwright E2E tests: `pnpm test:e2e`
- Run Playwright component tests: `pnpm test:ct`
- Run Playwright tests with UI: `pnpm test:e2e:ui`
- Generate PokeDB data: `pnpm data:gen` and `pnpm data:gen-maps`
- Format code using Biome: `pnpm format`
- Run linting and type checking: `pnpm lint`
- Detect unused files, exports, and dependencies: `pnpm run knip`
- Build the project: `pnpm build`
# Dependency Cruiser Configuration

We use `dependency-cruiser` to enforce architectural boundaries and clean dependency management across our monorepo.

## Rules

The following rules are currently enforced in `.dependency-cruiser.js`:

- `no-circular`: Warns on circular dependencies (e.g. A imports B, B imports A). These should be refactored to avoid memory leaks and maintain single responsibility.
- `not-to-unresolvable`: Errors when importing a module that cannot be resolved.
- `no-orphans`: Provides info about modules that are not used by any other module (ignoring common config files).
- `not-to-dev-dep`: Errors if production code (`src/*`) depends on a devDependency.
- `cross-package-boundary`: Errors if a package imports another package internally without going through its designated public API surface.

## Running

Run `pnpm lint:deps` to check dependencies manually.

## Exceptions

Currently, no exceptions are configured. If you find a legitimate case where a rule needs to be bypassed, modify `.dependency-cruiser.js` and document the rationale here.
