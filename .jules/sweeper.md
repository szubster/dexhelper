## 2026-04-29 - Archivist Run Learnings

**Learning:** Duplicate agent learnings for tools like `knip` or `oxlint` can scatter across journals (e.g. `sweeper.md` and `strategist.md`).
**Action:** Consolidate identical tool-specific learnings into a single comprehensive entry within the most relevant agent's journal to reduce noise and duplication.

## 2026-05-05 - Safe Removal of Re-export Abstractions
**Learning:** Files that serve only as re-exports for "backward compatibility" (like `src/utils/data.ts` re-exporting `src/engine/data/shared/staticData.ts`) introduce unnecessary indirection. While `knip` might not flag them if they are actively used, manually tracing their usage and updating call sites to point directly to the actual source file is a safe and effective way to reduce technical debt and simplify the module graph.
**Action:** When encountering a file that purely re-exports contents from another file without adding value, trace its usage using `grep`, update the imports at the call sites, and delete the obsolete abstraction file. Always verify the refactor by running `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to ensure no consumers were broken during the transition.


## 2026-06-25 - Comprehensive Knip Learnings and Dead Code Removal

**Learning:** `knip` is highly effective at identifying unused types and functions, but manual verification is crucial.
1. **False Positives in Tests & Setup:** Be extremely cautious when `knip` marks entire files (like `src/test-setup.ts`, `src/node-setup.ts`, `tests/e2e/test-utils.ts`, `vite-plugins/pokedata-plugin.ts` and `scripts/generate-pokedata.ts`) as unused, as they may be required by configuration files or test runners implicitly.
2. **Implicit Script Usage:** Always double-check `lefthook.yml` or hidden configs (`knip.json`, `.bundlemonrc.json`) where scripts might be implicitly used. For example, `scripts/validate-foundry-ids.ts` was used in `lefthook.yml` but reported as unused.
3. **Internal vs External Usage:** Sometimes `knip` gives false positives on exports only used within the file itself. Setting `ignoreExportsUsedInFile` in `knip.json` safely resolves this.
4. **Dependency Resolution Hints:** Pay attention to configuration hints output by `pnpm exec knip` to identify entries that can be safely removed from `ignore` or `ignoreDependencies` arrays in `knip.json` as it improves its detection.
5. **Non-Production Flag:** Using `pnpm knip --production` will often falsely flag non-production files such as CI scripts, tests, and testing utilities (e.g., in `.github/scripts/`, `scripts/`, or `tests/e2e/`) as unused.
6. **Task Context Check:** Before deleting code flagged as dead, always check the status of Foundry tasks (e.g., in `.foundry/`) as it may be related to recently closed or WIP tasks.

**Action:**
- Always verify potential unused exports by doing a global repository search (`grep`) to ensure they aren't dynamically referenced or used in tests before removing them.
- Always verify test and lint commands (`pnpm lint`, `pnpm test`, `pnpm test:e2e`) after any `knip`-driven cleanup to avoid silently breaking the build.

## 2026-06-25 - Refactoring and Code Health Learnings

**Learning:** Sometimes, an automated code health task may request fixes for issues (like an unused import) that have already been resolved on the `main` branch.
**Action:** Always verify the issue exists on the current branch using `grep` or `read_file` before making modifications. If the file is already in the ideal state, do not artificially introduce changes.

**Learning:** Refactoring long files or text structures using string matching in python or javascript can be error prone with indentation or overlapping strings. Writing a script to accurately parse the abstract syntax tree and make changes is difficult.
**Action:** Often the easiest way to make surgical edits to a code file without manual human input is to find unique anchors, slice the text, and recreate it exactly. When refactoring massive functions, splitting them into logical helpers greatly reduces complexity while retaining the exact same functional output. Avoid configuring any linter by globally disabling core rules, as it degrades codebase health. Ensure that disposable scripts are deleted before committing code.
