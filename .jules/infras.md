# Master Journal: Infras

## Session: 2026-07-26-02-18-04
# Infras Journal

## Critical Learnings
- **CI Synchronization**: The local `pnpm lint` script in `package.json` was running `pnpm check:biome`, but the GitHub Actions CI workflow (`.github/workflows/ci.yml`) was completely missing the Biome check step, allowing unformatted code to bypass CI. When adding or modifying tools in the `lint` script, ensure they are also mirrored as discrete steps in the CI pipeline.

## Session: 2026-08-03-02-16-49
# Infras Journal - Session $(date +"%Y-%m-%d-%H-%M-%S")

## Critical Learnings
- **CI Synchronization**: Discovered that the Playwright end-to-end tests (which are comprehensive and essential for ensuring no regressions in the UI workflow) were omitted from the GitHub Actions CI pipeline because `vitest` explicitly excludes `tests/e2e/`. Added a parallel `e2e` job in `.github/workflows/ci.yml` that sets up Playwright browsers and runs `pnpm test:e2e`. Also included uploading the `playwright-report` directory as an artifact to improve debugging DX in CI.

## Session: 2026-08-03-12-14-24
# Infras Journal - Session $(date +"%Y-%m-%d-%H-%M-%S")

## Critical Learnings
- **Tooling configuration context**: Discovered that Playwright end-to-end tests are already being run by a separate, dedicated GitHub Action workflow. Therefore, they should NOT be added as an extra job to the main CI workflow (`.github/workflows/ci.yml`), as this would lead to duplicate test executions.
- **Action Required**: The proposed PR must be reverted to keep the CI pipeline clean and avoid redundant e2e test executions.

## Session: jules-12956813812122219687-27266662
# Infras Journal - Session jules-12956813812122219687-27266662

## Critical Learnings

- Found a critical bug in the Foundry DAG Orchestrator where completed or cancelled tasks that were moved to `.foundry/archive/` were not correctly resolved by references pointing to their original paths.
- Fixed `resolveNodePath` in `.github/scripts/foundry-orchestrator.ts` to automatically attempt to resolve paths to their archived counterparts if the original file does not exist.
- Updated Phase 3 matches, Phase 4 target artifacts, and Phase 4.5 idempotent links to resolve using the updated helper.
- Added extensive regression tests to prevent similar issues in the future.

## Session: jules-session-infras-2026-07-30-01-45-54
# Infras Journal

## Critical Learnings
- The GitHub Actions  pipeline runs multiple linters (Biome, Oxlint, Knip) without configuring their reporters, making PR review DX suboptimal since logs must be read manually.
- Configured each linter in  to output in Github Annotations format (e.g.  for Biome,  for Oxlint,  for Knip). This will directly flag the relevant lines of code in a PR's 'Files Changed' tab.

## Session: jules-session-infras-2026-07-30-01-47-06
# Infras Journal

## Critical Learnings
- **GitHub Annotations DX:** The GitHub Actions pipeline runs multiple linters (Biome, Oxlint, Knip) without configuring their reporters, making PR review DX suboptimal since logs must be read manually.
- Configured each linter in `.github/workflows/ci.yml` to output in Github Annotations format (e.g. `--reporter=github` for Biome, `-f github` for Oxlint, `--reporter github-actions` for Knip). This directly flags the relevant lines of code in a PR's 'Files Changed' tab.

## Session: jules-session-infras
# Infras Journal - Session jules-infras

## Critical Learnings
- **Tooling configuration context:** `lefthook.yml` parallel execution can safely be enabled for this repo without hitting race conditions on pre-commit since the tasks (lint, check, types) do not mutually overlap file writes in a way that breaks.
- **Git hooks and Node engine issue:** Using `lefthook` along with `pnpm` can sometimes get into a broken state (`[ERROR] Command failed with exit code 1: pnpm install`) if hooks aren't set up correctly initially. Running `git config --unset-all --global core.hooksPath` allows `pnpm install` and the subsequent `lefthook install` to run properly.
- **CI Annotations with Built-in Reporters:** Tools like Playwright and Vitest support native Github Actions reporters that generate inline PR annotations. They can easily be activated in CI environments using `process.env['CI']` and `process.env['GITHUB_ACTIONS']` without needing dedicated Github Actions marketplace extensions.
- **Oxlint configuration**: CLI configuration arguments for `oxlint` (like `--import-plugin`, `--promise-plugin`) can be centralized using an `.oxlintrc.json` configuration file, which helps simplify scripts across different environments (e.g. `package.json` vs `.github/workflows/ci.yml`). We moved the configuration flags into `.oxlintrc.json` and updated scripts to use `-c .oxlintrc.json` to reduce CLI complexity.

