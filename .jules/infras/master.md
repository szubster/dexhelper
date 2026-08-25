## Critical Learnings
- **CI Synchronization**: Discovered that the Playwright end-to-end tests (which are comprehensive and essential for ensuring no regressions in the UI workflow) were omitted from the GitHub Actions CI pipeline because `vitest` explicitly excludes `tests/e2e/`. Added a parallel `e2e` job in `.github/workflows/ci.yml` that sets up Playwright browsers and runs `pnpm test:e2e`. Also included uploading the `playwright-report` directory as an artifact to improve debugging DX in CI.

## Critical Learnings
- **Tooling configuration context**: Discovered that Playwright end-to-end tests are already being run by a separate, dedicated GitHub Action workflow. Therefore, they should NOT be added as an extra job to the main CI workflow (`.github/workflows/ci.yml`), as this would lead to duplicate test executions.
- **Action Required**: The proposed PR must be reverted to keep the CI pipeline clean and avoid redundant e2e test executions.

- Found a critical bug in the Foundry DAG Orchestrator where completed or cancelled tasks that were moved to `.foundry/archive/` were not correctly resolved by references pointing to their original paths.
- Fixed `resolveNodePath` in `.github/scripts/foundry-orchestrator.ts` to automatically attempt to resolve paths to their archived counterparts if the original file does not exist.
- Updated Phase 3 matches, Phase 4 target artifacts, and Phase 4.5 idempotent links to resolve using the updated helper.

## Critical Learnings
- **GitHub Annotations DX:** The GitHub Actions pipeline runs multiple linters (Biome, Oxlint, Knip) without configuring their reporters, making PR review DX suboptimal since logs must be read manually.
- Configured each linter in `.github/workflows/ci.yml` to output in Github Annotations format (e.g. `--reporter=github` for Biome, `-f github` for Oxlint, `--reporter github-actions` for Knip). This directly flags the relevant lines of code in a PR's 'Files Changed' tab.

## Critical Learnings
- **Tooling configuration context:** `lefthook.yml` parallel execution can safely be enabled for this repo without hitting race conditions on pre-commit since the tasks (lint, check, types) do not mutually overlap file writes in a way that breaks.
- **Git hooks and Node engine issue:** Using `lefthook` along with `pnpm` can sometimes get into a broken state (`[ERROR] Command failed with exit code 1: pnpm install`) if hooks aren't set up correctly initially. Running `git config --unset-all --global core.hooksPath` allows `pnpm install` and the subsequent `lefthook install` to run properly.
- **CI Annotations with Built-in Reporters:** Tools like Playwright and Vitest support native Github Actions reporters that generate inline PR annotations. They can easily be activated in CI environments using `process.env['CI']` and `process.env['GITHUB_ACTIONS']` without needing dedicated Github Actions marketplace extensions.
- **Oxlint configuration**: CLI configuration arguments for `oxlint` (like `--import-plugin`, `--promise-plugin`) can be centralized using an `.oxlintrc.json` configuration file, which helps simplify scripts across different environments (e.g. `package.json` vs `.github/workflows/ci.yml`). We moved the configuration flags into `.oxlintrc.json` and updated scripts to use `-c .oxlintrc.json` to reduce CLI complexity.

## Critical Learnings
- **Tooling configuration context**: Discovered that Biome schema in `biome.jsonc` was outdated (`2.5.6`) while the CI workflow (`.github/workflows/biome.yml`) was using `2.5.4` and the `package.json` had `^2.5.7`. Upgraded CI workflow to `2.5.7` and schema to `2.5.7` to align with the package version, resolving the schema mismatch error raised during `pnpm run check:biome`.
- **Knip configuration context**: `knip.json` ignored a file that was already deleted or implicitly resolved (`src/engine/saveParser/parsers/feebas.worker.ts`), causing knip to throw an unnecessary configuration hint. Removed it to silence the warning.
- **Action Taken**: Updated the Biome versions in `biome.jsonc` and `biome.yml` to match `package.json` (`2.5.7`). Removed stale ignore entry in `knip.json`.
- **Package Manager Lockfiles**: When upgrading tooling versions, especially those defined in `package.json`, ensure that you also update the `pnpm-lock.yaml` file (or equivalent) to enforce consistent resolution across all developer environments. However, since we merely bumped the CI versions and `package.json` already specified `^2.5.7`, a `pnpm install` did not result in a lockfile change in this session.

## Critical Learnings
- **Tooling configuration context**: Discovered that the `.bundlemonrc.json` configuration was reporting uncompressed chunk sizes. While gzip sizes are useful for tracking network transfer, tracking uncompressed bundle sizes is a more accurate proxy for JavaScript VM parse, compile, and execution time constraints on lower-end devices. Therefore, we should keep `.bundlemonrc.json` configured with `"defaultCompression": "none"`.
- **Vite Build Output Analysis**: When analyzing Vite's build logs or JSON files like `.bundlemonrc.json`, standard bash tools like `cat` may truncate output. Always use targeted extraction tools like `jq` (e.g. `jq '.files' .bundlemonrc.json`) or `grep` combined with `tail` (e.g. `grep -E 'dist/' build.log | tail -n 20`) to fetch complete, untruncated arrays or lists before making assumptions about paths or sizes.

---

## Critical Learnings
- Upgraded infrastructure tooling versions: @biomejs/biome to 2.5.8, oxlint to 1.78.0, and knip to 6.32.2 to keep the ecosystem current.

## Critical Learnings
- **Tooling configuration context**: Discovered that Knip was running as part of the `pnpm lint` command but the `--reporter github-actions` was only defined in `.github/workflows/ci.yml`. More critically, Knip wasn't hooked into `lefthook.yml` pre-commits, meaning unused exports or dependencies could easily be committed by a local developer and only flagged once they hit GitHub Actions CI.
- **Action Taken**: Added `knip` to `lefthook.yml` under `pre-commit` hook (in parallel) to enforce unused export validation before code can be committed locally. Explicitly added `--no-exit-code` so developers receive warnings locally without being totally blocked from making local WIP commits, which balances local DX with codebase hygiene.

## Critical Learnings
- **Tooling configuration context**: Discovered that Knip was running as part of the `pnpm lint` command but the `--reporter github-actions` was only defined in `.github/workflows/ci.yml`. More critically, Knip wasn't hooked into `lefthook.yml` pre-commits, meaning unused exports or dependencies could easily be committed by a local developer and only flagged once they hit GitHub Actions CI.
- **Action Taken**: Added `knip` to `lefthook.yml` under `pre-commit` hook (in parallel) to enforce unused export validation before code can be committed locally. Explicitly added `--no-exit-code` so developers receive warnings locally without being totally blocked from making local WIP commits, which balances local DX with codebase hygiene.

## Critical Learnings
- **Tooling ecosystem alignment**: Upgraded `vitest`, `@vitest/browser`, `@vitest/coverage-v8`, `vite`, and `@vitejs/plugin-react` to their latest minor/patch versions (`4.1.11` and `8.2.2`). This fixes a bug where running browser-based component tests (`pnpm test:ct`) would fail because `@vitest/browser` and `vitest` versions were mismatched, preventing Playwright from launching properly.
- **Dead-code analysis maintenance**: Removed outdated `ignore` configuration lines from `knip.json` (for the deleted file `scripts/verify-adr-compliance.ts` and the removed `ts-morph` dependency) which caused `pnpm knip` to throw configuration hint errors. This ensures the linting pipeline runs smoothly.
