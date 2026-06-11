[Output truncated for brevity]

gned as a drop-in replacement for a subset of ESLint rules, it catches issues (like empty object destructuring or unused catch parameters) that Biome might miss or hasn't implemented yet, all while remaining extremely fast.

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

## 2026-05-02 - Added pnpm audit to CI
**Learning:** Added `pnpm audit` job to `.github/workflows/ci.yml` to automatically catch dependency vulnerabilities during CI runs. Configured it to run with `--prod` flag to avoid failing builds on devDependency vulnerabilities, as they are mostly harmless in this context and can block releases unnecessarily.

## 2026-05-03 - Suppressed chunk size warning limit
**Learning:** Added `chunkSizeWarningLimit: 1000` to `vite.config.ts` to suppress noisy terminal warnings (`Some chunks are larger than 500 kB`) during builds. The user previously decided to favor a single chunk setup because the app is small and splitting would marginalize caching benefits due to frequent updates. This cleans up the build DX while retaining the deliberate architectural choice.

## 2026-05-04 - Fixed Biome Schema Version Mismatch
**Learning:** The Biome CLI version (2.4.14) in `package.json` did not match the schema version (2.4.13) in `biome.jsonc` and `.github/workflows/biome.yml`, causing `knip` to throw schema mismatch warnings during `pnpm lint`. Used `biome migrate` to automatically resolve the `biome.jsonc` schema and manually updated the GitHub Action version to maintain alignment and clean CI output.

## 2026-05-06 - Clean up test coverage parsing errors
**Learning:** Configured `coverage` blocks in `vitest.config.ts` to exclusively `include: ['src/**/*.ts', 'src/**/*.tsx']` and explicitly `exclude: ['**/*.json']`. This stops `rolldown` (used by `@vitest/coverage-v8`) from attempting to parse statically imported `.json` files as modules, which caused noisy syntax errors during `pnpm test --coverage` runs and broke test suite exits.
Critical learnings:
- Removed `syncPromise` and `_resetSync` from `src/db/PokeDB.ts` completely to eliminate caching and rely exclusively on dataloader/react-query, which also successfully resolves the hanging Vitest process in the `node` test suite, preventing issues caused by dangling unhandled promises or unclosed requests.

## 2026-05-10 - Added sort-package-json
**Learning:** Added `sort-package-json` to the pipeline via `devDependencies` and `lefthook.yml` to automatically sort `package.json` locally. Note: Biome currently does not natively sort `package.json` correctly. We did not add it to the `pnpm lint` script as it currently modifies files instead of just checking them.
- **Updated**: Added `lint:package-json` with `--check` flag to the `lint` command to enforce that `package.json` stays correctly sorted in CI pipelines.

## 2026-05-11 - Cleaned up knip.json
**Learning:** Removed outdated `ignore` and `ignoreDependencies` configurations from `knip.json` that were previously suggested by `pnpm knip`. This avoids unnecessary ignored files and configuration hints during linting.

## 2026-05-13 - Optimized Lefthook Pre-Commit
**Learning:** Found that `type-check` hook in `lefthook.yml` was running `pnpm lint`, which sequentially ran `type-check`, `check:biome`, `oxlint`, `knip`, and `lint:package-json` across the *entire project*. Because `lefthook` already has separate commands for `biome-check`, `oxlint`, and `sort-package-json` on `{staged_files}`, this caused redundant full-project checks on every commit, significantly slowing down DX. Replaced `run: pnpm lint` with `run: pnpm type-check` for the `type-check` command to maintain the full-project type safety requested by the user while avoiding redundant linter execution.

## 2026-05-15 - Switched jest rules to vitest rules in oxlint
**Learning:** Found that `.oxlintrc.json` had rules configured for `jest` plugin (`jest/no-disabled-tests`, `jest/no-standalone-expect`) but the project uses Vitest and explicitly registered the `"vitest"` plugin. Replaced the `jest` prefix with `vitest` to properly apply the rules to Vitest files.

## 2026-05-18 - Added madge for circular dependency checking
**Learning:** Integrated `madge` to statically analyze and prevent circular dependencies in the codebase. Added `lint:circular` to the `lint` pipeline to ensure PRs fail if circular dependencies are introduced.
* The project uses Vite 8 with Rolldown. When configuring `manualChunks` in `vite.config.ts`'s `rollupOptions.output`, it must be defined as a function (e.g., `manualChunks(id) { ... }`) rather than an object to avoid build errors like 'Expected Function but received Object'.

## 2026-05-20 - Fixed Biome Schema Version Mismatch Again
**Learning:** The Biome CLI version (2.4.15) in `package.json` and `biome.jsonc` was bumped but the version in `.github/workflows/biome.yml` was left at `2.4.14`, meaning CI wasn't using the same version as local. Updated the workflow to match.

## 2026-05-21 - Rejected SWC Vite Plugin
**Learning:** Initially evaluated replacing `@vitejs/plugin-react` with `@vitejs/plugin-react-swc` under the assumption it used Babel. The user rejected this, noting that in Vite 8, the default react plugin utilizes `oxc` and is currently considered superior to `swc`. The change was reverted to preserve the optimal default tooling.

## 2026-05-22 - Rejected commitlint
**Learning:** Evaluated using `commitlint` in the pre-commit hook (`lefthook.yml`) to enforce conventional commits. User rejected this change because they do not care about conventional commits formatting that much and do not want to add friction and cost to AI development.

## 2026-05-23 - Updated Tooling Dependencies
**Learning:** Updated dependencies to keep tooling modern and secure.

## 2026-05-27 - Optimized Vite Chunk Strategy
**Learning:** Added explicit chunk splitting in `vite.config.ts` for `@tanstack/react-query` and `lucide-react`. This extracts relatively static vendor logic from the main app chunk, slightly reducing its size and dramatically improving long-term cache hits for clients between minor app deployments. Corresponding limits in `.bundlemonrc.json` were updated to lock in these granular optimizations.

## 2026-05-24 - Enforced package.json sorting in CI
**Learning:** Discovered that the local `pnpm lint` pipeline had `lint:package-json` added, but the CI pipeline (`.github/workflows/ci.yml`) was missing it. I have added the `Package JSON Sort Check` to `ci.yml` to ensure `package.json` sorting is properly enforced in CI environments, preventing unsorted packages from slipping through into merged code.

## 2026-05-28 - Rejected strict dead code detection with Knip
**Learning:** Configured `knip.json` with `"files": "error"` and `"exports": "error"` to strictly fail CI if there is any unused files or dead code exports. User rejected this change, stating "We can have some dead code. For features which are being worked on. That's fine. AI agent should verify findings (I think one already does it) and decide about deletion". Reverted strict Knip settings to allow dead code during active development.

## 2026-05-31 - Empty PR Policy for Infrastucture
**Learning:** When tasked with improving development tooling, if the infrastructure (e.g. Biome, Oxlint, Knip, Lefthook, Dependabot, Caching, Bundlemon, Codecov) is already highly optimized and no further tooling improvement can be cleanly implemented without duplicating or breaking existing tooling, it is strictly preferable to submit an empty PR rather than forcing a change. An empty PR cleanly transitions the task without introducing bloat or technical debt.
## 2026-06-02 - Use .nvmrc for GitHub Actions
**Learning:** Replaced hardcoded `node-version: 24` and `node-version: '24'` with `node-version-file: \".nvmrc\"` in all GitHub Actions workflows (`ci.yml`, `deploy.yml`, `foundry-engine.yml`, `playwright.yml`, `sync-pokedata.yml`). This ensures that the CI environment always matches the exact local development version of Node.js specified in `.nvmrc`, providing a single source of truth and preventing version drift between environments.

## 2026-06-05 - Bumped knip to latest
**Learning:** Evaluated upgrading `knip` to `v6.16.0`. Discovered that the `$schema` URL in `knip.json` also needs to be updated to `@6` to avoid schema validation warnings. Discovered `pnpm knip` failing due to `gh` being used in bash scripts. Fixed this by adding `ignoreBinaries: ["gh"]` to `knip.json`. Also removed an unused barrel file `src/components/run/index.ts` identified by Knip. Finally, the test `AssistantSuggestionCard.test.tsx` needed to have `expect` statements added to satisfy `vitest/expect-expect` rule.

## 2026-06-09 - Fix Biome schema version
**Learning:** Config drift between `package.json` (`2.4.16`), `biome.yml` (`2.4.15`), and `biome.jsonc` schemas can cause `sort-package-json` or `pnpm lint:package-json` to fail in CI pipelines, as well as lead to config mismatch between local devs and CI runners. Always ensure Biome schema and runner versions are updated in sync when upgrading.

## 2026-06-11 - Empty PR Policy for Infrastructure
**Learning:** When tasked with improving development tooling, and the existing infrastructure (Biome, Oxlint, Knip, Lefthook, Dependabot, Caching, Bundlemon, Codecov) is highly optimized, it is strictly preferable to submit an empty PR rather than forcing a change. An empty PR cleanly transitions the task without introducing bloat or technical debt. Do not modify the application logic or UI code to address tooling findings like unused files during an infrastructure task.
