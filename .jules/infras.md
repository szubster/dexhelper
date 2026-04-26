## 2026-04-19 - Restored BundleMon
**Learning:** User prefers to keep BundleMon alongside `@codecov/vite-plugin`. BundleMon is explicitly maintained despite overlapping with `@codecov/vite-plugin` per user request.

## 2026-04-19 - Rejected tsc-files
**Learning:** Evaluated using `tsc-files` in the pre-commit hook (`lefthook.yml`) to speed up type-checking by targeting only staged files instead of running `pnpm lint` (which does a full project type-check). User rejected this change because the tradeoff of potentially missing compilation failures in unstaged files that depend on the staged files is not acceptable. The full type check in pre-commit remains to ensure local safety.

## 2026-04-20 - Implemented Vite Manual Chunking Strategy
**Learning:** Separating `node_modules` dependencies into distinct manual chunks (e.g., `vendor-react`, `vendor-tanstack`, `vendor-lucide`) in `vite.config.ts` significantly improves browser caching behavior. Instead of one massive index chunk that invalidates entirely whenever app code changes, stable libraries can remain cached in user browsers, leading to faster load times on subsequent visits.

## 2026-04-20 - Rejected Vite Manual Chunking Strategy
**Learning:** While manual chunking can improve caching, it was rejected for this project because the app is small enough that a single chunk is preferred, and the `@tanstack` dependencies are updated so frequently that the caching benefits are marginalized.

## 2026-04-21 - Added Knip
**Learning:** Integrated `knip` into the pipeline (via the `lint` script) to detect unused files, exports, types, and unlisted/unused dependencies, improving overall code health and CI guardrails. Configured it to ignore `fake-indexeddb` and `bundlemon` which are dynamically utilized by tests/CI but not statically imported by source code, as well as ignoring `.github/scripts/**` which bypass typical module resolution.

## 2026-04-23 - Added oxlint
**Learning:** Integrated `oxlint` as an additional ultra-fast linter in the linting pipeline (`lint` script, GitHub Actions, and Lefthook). Since `oxlint` is designed as a drop-in replacement for a subset of ESLint rules, it catches issues (like empty object destructuring or unused catch parameters) that Biome might miss or hasn't implemented yet, all while remaining extremely fast.

## 2026-04-24 - Enabled TypeScript Incremental Builds
**Learning:** Enabled `"incremental": true` in the base `tsconfig.json` to significantly improve local `pnpm type-check` performance (reducing run time from ~14s to ~4s on subsequent runs). This provides a massive developer experience improvement for local pre-commit hooks, allowing the system to maintain full project type safety (as originally desired) without the painful delay of a complete rebuild every time. Added `*.tsbuildinfo` to `.gitignore` to prevent cache file pollution.

## 2026-04-26 - Enabled Playwright Parallelism
**Learning:** Updated `playwright.config.ts` to allow multiple workers (`workers: process.env['CI'] ? 2 : '50%'`) instead of the hardcoded `1` worker. This unblocks Playwright's concurrency capabilities, drastically speeding up E2E test suite execution time both locally and in CI. Additionally, confirmed that caching `.tsbuildinfo` in CI is actively rejected by the user, as the incremental build cache is strictly intended for local development performance.
