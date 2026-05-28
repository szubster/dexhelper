## 2026-04-23 - Knip Learnings Consolidated

**Learning:** `knip` is highly effective at identifying unused types and functions, but manual verification is crucial. Removing types and function exports works well, but one must be very careful when `knip` marks entire files (like `src/test-setup.ts`, `src/node-setup.ts`, `tests/e2e/test-utils.ts`, `vite-plugins/pokedata-plugin.ts` and `scripts/generate-pokedata.ts`) as unused, as they may be required by configuration files or test runners implicitly. Similarly, `knip` might complain about "unused" `devDependencies` like `fake-indexeddb` when they are actually implicitly used.

**Action:** Be extremely cautious to evaluate if `knip`'s findings are actually dead files, or simply testing/build artifacts. Always verify potential unused exports by doing a global repository search (`grep`) to ensure they aren't dynamically referenced or used in tests before removing them. Always verify test and lint commands after any `knip`-driven cleanup to avoid silently breaking the build or test environment. Use `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to catch such broken functionality locally.
- **Action**: Always double-check `lefthook.yml` or other hidden configurations (`knip.json`, etc.) where scripts might be implicitly used. For example, `scripts/validate-foundry-ids.ts` was used in `lefthook.yml` but reported as an unused file by `knip`. We had to explicitly add it to the `ignore` array in `knip.json`.

## 2026-04-29 - Archivist Run Learnings

**Learning:** Duplicate agent learnings for tools like `knip` or `oxlint` can scatter across journals (e.g. `sweeper.md` and `strategist.md`).
**Action:** Consolidate identical tool-specific learnings into a single comprehensive entry within the most relevant agent's journal to reduce noise and duplication.
Removed unused type ClassValue import from src/utils/cn.ts by utilizing Parameters<typeof clsx> instead.

## 2026-05-02 - SaveParser API and Knip Cleanup

**Learning:** Sometime a file may be mistakenly ignored in `knip.json` even if it is fully integrated into the module graph.
**Action:** Run `pnpm exec knip` periodically and check the `Configuration hints` output to identify entries that can be safely removed from the `knip.json` `ignore` array.

## 2026-05-03 - Improved Orchestrator Late-Binding Completion
**Learning:** Addressed a bug in `.github/scripts/foundry-orchestrator.ts` where Late-Binding parent nodes (nodes waiting for dynamically generated children to complete) would remain stuck in a PENDING state indefinitely even after all children successfully completed. Added a dedicated detection phase (Phase 4.1) to find these specific `PENDING` nodes, verify they possess children, check if strictly all children are `COMPLETED`, ensure no implicit/explicit dependencies are unfulfilled, and directly promote the parent node to `COMPLETED`. Unit tested and validated to maintain DAG integrity.
# Sweeper

## 2026-05-05 - Safe Removal of Re-export Abstractions
**Learning:** Files that serve only as re-exports for "backward compatibility" (like `src/utils/data.ts` re-exporting `src/engine/data/shared/staticData.ts`) introduce unnecessary indirection. While `knip` might not flag them if they are actively used, manually tracing their usage and updating call sites to point directly to the actual source file is a safe and effective way to reduce technical debt and simplify the module graph.
**Action:** When encountering a file that purely re-exports contents from another file without adding value, trace its usage using `grep`, update the imports at the call sites, and delete the obsolete abstraction file. Always verify the refactor by running `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to ensure no consumers were broken during the transition.

## 2026-05-18 - Refactoring large files and managing Knip ignore lists

**Learning:** Sometime `knip` gives false positives on exports only used within the file itself. Setting `ignoreExportsUsedInFile` in `knip.json` safely resolves this issue. When refactoring massive functions, splitting them into logical helpers greatly reduces complexity while retaining the exact same functional output. Avoid configuring `knip` or any linter by globally disabling core rules, as it degrades codebase health. Ensure that disposable scripts are deleted before committing code.
## 2026-06-07 - Knip dependency resolution\n\n**Learning:** Sometime a dependency or file may no longer need to be explicitly ignored in `knip.json` because `knip` successfully figures out the usage. \n**Action:** Pay attention to configuration hints in `knip` to remove `bundlemon` and `gray-matter` from `knip.json` `ignoreDependencies`.

## 2026-06-25 - Handling False Positives in Code Health Tasks
**Learning:** Sometimes, an automated code health task may request fixes for issues (like an unused import) that have already been resolved on the `main` branch.
**Action:** Always verify the issue exists on the current branch using `grep` or `read_file` before making modifications. If the file is already in the ideal state, do not artificially introduce changes.
- Refactoring long files or text structures using string matching in python or javascript can be error prone with indentation or overlapping strings. Writing a script to accurately parse the abstract syntax tree and make changes is difficult. Often the easiest way to make surgical edits to a code file without manual human input is to find unique anchors, slice the text, and recreate it exactly.
When using `pnpm knip --production` to identify dead code, it will often falsely flag non-production files such as CI scripts, tests, and testing utilities (e.g., in `.github/scripts/`, `scripts/`, or `tests/e2e/`) as unused. Always manually verify that flagged files are genuinely dead code before deletion.
Before deleting code flagged as dead, always check the status of Foundry tasks (e.g., in `.foundry/`) as it may be related to recently closed or WIP tasks.


**Action:** Before deleting code flagged as dead, always check the status of Foundry tasks (e.g., in `.foundry/`) as it may be related to recently closed or WIP tasks. Always verify whether the code is part of an active `STORY` or `EPIC`.
