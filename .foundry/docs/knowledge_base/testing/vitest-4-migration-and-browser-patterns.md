# Vitest 4 Migration & Browser Testing Patterns

## Overview
The project has been migrated to Vitest 4. The workspace configuration is now handled via `test.projects` in `vitest.config.ts` instead of `vitest.workspace.ts`.

## Key Changes
- **Configuration**: Use `defineConfig` and merge with `vite.config.ts` to ensure plugins and aliases are available in test projects.
- **Browser Provider**: The `provider` in `browser` configuration must use the `playwright()` factory function from `@vitest/browser-playwright`.
- **Scripts**: 
  - `pnpm test`: Runs all projects (node and browser).
  - `pnpm test:ct`: Runs only the browser-based component tests.

## Mocking Constraints
- **window.location**: In Vitest Browser Mode (Playwright), `window.location` is read-only. Traditional JSDOM-style mocks using `Object.defineProperty` will fail.
- **Recommendation**: Wrap window-level actions (like `reload()`) in utility functions (e.g., `src/utils/window.ts`) and mock the utility module using `vi.mock`.

## File Structure
- `vitest.config.ts`: Root configuration defining projects.
- `src/utils/window.ts`: Utility for browser-level operations.
