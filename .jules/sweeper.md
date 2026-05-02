## 2026-04-23 - Knip Learnings Consolidated

**Learning:** `knip` is highly effective at identifying unused types and functions, but manual verification is crucial. Removing types and function exports works well, but one must be very careful when `knip` marks entire files (like `src/test-setup.ts`, `src/node-setup.ts`, `tests/e2e/test-utils.ts`, `vite-plugins/pokedata-plugin.ts` and `scripts/generate-pokedata.ts`) as unused, as they may be required by configuration files or test runners implicitly. Similarly, `knip` might complain about "unused" `devDependencies` like `fake-indexeddb` when they are actually implicitly used.

**Action:** Be extremely cautious to evaluate if `knip`'s findings are actually dead files, or simply testing/build artifacts. Always verify potential unused exports by doing a global repository search (`grep`) to ensure they aren't dynamically referenced or used in tests before removing them. Always verify test and lint commands after any `knip`-driven cleanup to avoid silently breaking the build or test environment. Use `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to catch such broken functionality locally.
- **Action**: Always double-check `lefthook.yml` or other hidden configurations (`knip.json`, etc.) where scripts might be implicitly used. For example, `scripts/validate-foundry-ids.ts` was used in `lefthook.yml` but reported as an unused file by `knip`. We had to explicitly add it to the `ignore` array in `knip.json`.

## 2026-04-29 - Archivist Run Learnings

**Learning:** Duplicate agent learnings for tools like `knip` or `oxlint` can scatter across journals (e.g. `sweeper.md` and `strategist.md`).
**Action:** Consolidate identical tool-specific learnings into a single comprehensive entry within the most relevant agent's journal to reduce noise and duplication.
Removed unused type ClassValue import from src/utils/cn.ts by utilizing Parameters<typeof clsx> instead.
