# Infras Journal - Session jules-infras-lefthook

## Critical Learnings
- **Tooling configuration context:** `lefthook.yml` parallel execution can safely be enabled for this repo without hitting race conditions on pre-commit since the tasks (lint, check, types) do not mutually overlap file writes in a way that breaks.
- **Git hooks and Node engine issue:** Using `lefthook` along with `pnpm` can sometimes get into a broken state (`[ERROR] Command failed with exit code 1: pnpm install`) if hooks aren't set up correctly initially. Running `git config --unset-all --global core.hooksPath` allows `pnpm install` and the subsequent `lefthook install` to run properly.
