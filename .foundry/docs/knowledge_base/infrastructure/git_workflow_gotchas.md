# Git & Biome Workflow Gotchas

## Biome Pre-commit Hook
The project uses `lefthook` for pre-commit tasks. The `biome-check` command is configured to:
1. Run `biome check --write` on staged files.
2. Automatically stage fixed files (`stage_fixed: true`).
3. **FAIL THE COMMIT** if any warnings remain (`--error-on-warnings`).

### The Problem
Biome `--write` only applies *safe* fixes (mostly formatting). It does not automatically fix lint warnings like `noExplicitAny`, which are common in our test suites. Because `--error-on-warnings` is set, these warnings will abort the commit even if formatting was successfully applied.

### Recommendations for Agents
1. **Pre-emptive Fix**: Before committing, run `pnpm exec biome check --write .` manually and stage the changes.
2. **Handle Remaining Warnings**: If warnings persist (like `any` usage), either:
   - Resolve the types properly.
   - Use `// biome-ignore lint/suspicious/noExplicitAny: reason` to silence them.
   - Commit with `--no-verify` (`-n`) only if you have confirmed functional correctness via `tsc` and `pnpm test`.
3. **Double Commit Pattern**: If a commit fails due to stylistic warnings, check `git status` for auto-fixed files, stage them, and retry the commit with `-n` to bypass the remaining unfixable warnings.
