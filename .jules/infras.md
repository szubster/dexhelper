## Critical Learnings
- **CI Synchronization**: The local `pnpm lint` script in `package.json` was running `pnpm check:biome`, but the GitHub Actions CI workflow (`.github/workflows/ci.yml`) was completely missing the Biome check step, allowing unformatted code to bypass CI. When adding or modifying tools in the `lint` script, ensure they are also mirrored as discrete steps in the CI pipeline.

## Critical Learnings
- **Tooling configuration context**: Discovered that Playwright end-to-end tests are already being run by a separate, dedicated GitHub Action workflow. Therefore, they should NOT be added as an extra job to the main CI workflow (`.github/workflows/ci.yml`), as this would lead to duplicate test executions.
- **Action Required**: The proposed PR must be reverted to keep the CI pipeline clean and avoid redundant e2e test executions.

## Critical Learnings

- Found a critical bug in the Foundry DAG Orchestrator where completed or cancelled tasks that were moved to `.foundry/archive/` were not correctly resolved by references pointing to their original paths.
- Fixed `resolveNodePath` in `.github/scripts/foundry-orchestrator.ts` to automatically attempt to resolve paths to their archived counterparts if the original file does not exist.
- Updated Phase 3 matches, Phase 4 target artifacts, and Phase 4.5 idempotent links to resolve using the updated helper.
- Added extensive regression tests to prevent similar issues in the future.

## Critical Learnings
- **GitHub Annotations DX:** The GitHub Actions pipeline runs multiple linters (Biome, Oxlint, Knip) without configuring their reporters, making PR review DX suboptimal since logs must be read manually.
- Configured each linter in `.github/workflows/ci.yml` to output in Github Annotations format (e.g. `--reporter=github` for Biome, `-f github` for Oxlint, `--reporter github-actions` for Knip). This directly flags the relevant lines of code in a PR's 'Files Changed' tab.

## Critical Learnings
- **Tooling configuration context:** `lefthook.yml` parallel execution can safely be enabled for this repo without hitting race conditions on pre-commit since the tasks (lint, check, types) do not mutually overlap file writes in a way that breaks.
- **Git hooks and Node engine issue:** Using `lefthook` along with `pnpm` can sometimes get into a broken state (`[ERROR] Command failed with exit code 1: pnpm install`) if hooks aren't set up correctly initially. Running `git config --unset-all --global core.hooksPath` allows `pnpm install` and the subsequent `lefthook install` to run properly.
- **CI Annotations with Built-in Reporters:** Tools like Playwright and Vitest support native Github Actions reporters that generate inline PR annotations. They can easily be activated in CI environments using `process.env['CI']` and `process.env['GITHUB_ACTIONS']` without needing dedicated Github Actions marketplace extensions.
- **Oxlint configuration**: CLI configuration arguments for `oxlint` (like `--import-plugin`, `--promise-plugin`) can be centralized using an `.oxlintrc.json` configuration file, which helps simplify scripts across different environments (e.g. `package.json` vs `.github/workflows/ci.yml`). We moved the configuration flags into `.oxlintrc.json` and updated scripts to use `-c .oxlintrc.json` to reduce CLI complexity.
