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

## Recent Actions
- Removed several unused exports (`fallbackStrategy`, `getOutdoorMapId`, `detectGen1GameVersion`, `parseCaughtData`, `detectGen2GameVersion`, `getVersionInfo`, `MAX_DEX_ACROSS_GENS`, `ALL_VERSION_IDS`) across the engine and utilities.
- Cleaned up corresponding unit tests that were intimately testing internal implementation details.
- Ensured all tests and e2e scenarios pass successfully after the cleanup.
