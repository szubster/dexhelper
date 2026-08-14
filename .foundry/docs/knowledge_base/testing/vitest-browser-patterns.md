# Vitest Browser Testing Patterns

## Overview
The workspace configuration is handled via `test.projects` in `vitest.config.ts` instead of `vitest.workspace.ts`.

## Key Changes
- **Configuration**: Use `defineConfig` and merge with `vite.config.ts` to ensure plugins and aliases are available in test projects.
- **Browser Provider**: The `provider` in `browser` configuration must use the `playwright()` factory function from `@vitest/browser-playwright`.
- **Asynchronous Rendering**: In `vitest-browser-react`, the `render()` function returns a Promise and must be awaited to avoid `no-floating-promises` lint errors.
- **Scripts**: 
  - `pnpm test`: Runs all projects (node and browser).
  - `pnpm test:ct`: Runs only the browser-based component tests.

## Banned Frameworks
- **@testing-library/react and @testing-library/**: Strictly prohibited. Use `vitest-browser-react` for component unit tests and `@playwright/test` for E2E tests.

## Mocking Constraints
- **window.location**: In Vitest Browser Mode (Playwright), `window.location` is read-only. Traditional JSDOM-style mocks using `Object.defineProperty` will fail.
- **Recommendation**: Wrap window-level actions (like `reload()`) in utility functions (e.g., `src/utils/window.ts`) and mock the utility module using `vi.mock`.

## File Structure
- `vitest.config.ts`: Root configuration defining projects.
- `src/utils/window.ts`: Utility for browser-level operations.
