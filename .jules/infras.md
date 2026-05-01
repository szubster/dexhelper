
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

## 2026-04-25 - Rejected cspell
**Learning:** Evaluated using `cspell` as a spelling checker for code, comments, and configuration files. User rejected this change, preferring to avoid adding automated spell checking to the pipeline.

## 2026-04-24 - Rejected caching location query locally
**Learning:** Evaluated caching location query directly inside IndexedDB client using local variable, since `LocationSuggestions.tsx` gets a debounced input to query locations repeatedly. But user requested not to do so, because data fetching caching is already handled well enough by `dataloader` and `tanstack/query`.

## 2026-04-27 - Enabled oxlint type-aware rules
**Learning:** Installed `oxlint-tsgolint` and enabled `--type-aware` in oxlint. Fixed multiple floating promise warnings across the codebase. Type-aware linting acts as a fast alternative to full typescript-eslint type checking.
- **Orchestrator fixes:** Identified and fixed a bug where the DAG orchestrator entered an impossible loop due to incorrectly evaluating a completed parent's completion status based on its pending child. `isHierarchicallyIncomplete` was modified to accept `evaluatingFor` and correctly ignore the evaluating node and its descendants. Also fixed a bug where `COMPLETED` nodes were improperly suspended if their children were incomplete. Added robust parsing fallbacks for missing/unparsed nodes to correctly evaluate their completion status.

## 2026-05-01 - Optimized CI Pipeline
**Learning:** Evaluated current sequential CI setup. Discovered that splitting testing, linting, and building into parallel jobs decreases total CI run time for the `ci.yml` workflow. Added `concurrency` blocks across `ci.yml`, `playwright.yml`, and `biome.yml` to automatically cancel redundant in-progress runs when new commits are pushed, saving CI minutes and improving developer experience.
