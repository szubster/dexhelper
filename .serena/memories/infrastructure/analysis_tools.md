# Project Infrastructure - Bundle Analysis and Coverage

- **BundleMon**: Restored in April 2026. Configured in `.bundlemonrc.json`. It monitors the sizes of `dist/assets/index-*.js` (limit 650KB) and `dist/assets/style-*.css` (limit 100KB). It runs in the CI workflow `ci.yml`.
- **Codecov**: Integrated for test coverage and bundle analysis.
  - Test coverage is reported by `vitest` using `c8`.
  - Bundle analysis is handled by `@codecov/vite-plugin` in `vite.config.ts`.
- Both tools are currently running in parallel as of April 12, 2026.
- **Biome**: Unified linter and formatter.
  - Configured in `biome.jsonc`.
  - Enforcement Level: **Strict (Errors only)**. All violations, including warnings and nursery rules (e.g., `useSortedClasses`), are treated as errors.
  - Integration: Runs in CI via `pnpm lint` which calls `biome check --error-on-warnings`.
