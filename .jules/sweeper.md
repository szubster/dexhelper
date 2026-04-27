## 2026-04-19 - Cleaned up unused constants in gen1 assistantData
**Learning:** Found `GEN1_ITEMS` and `OBEDIENCE_CAPS` in `src/engine/data/gen1/assistantData.ts` which were not imported or used anywhere else in the application. `knip` tool or targeted `grep` commands are useful for finding such dead code.
**Action:** Always verify potential unused exports by doing a global repository search to ensure they aren't dynamically referenced or used in tests before removing them.

## 2026-04-22 - Cleaned up unused exports and dead code with knip
**Learning:** `knip` is highly effective at identifying unused types and functions, but manual verification is crucial. Removing types and function exports works well, but one must be very careful when `knip` marks entire files (like `src/test-setup.ts`) as unused, as they may be required by configuration files or test runners implicitly. Similarly, `knip` might complain about "unused" `devDependencies` like `fake-indexeddb` when they are actually implicitly used.
**Action:** Always verify test and lint commands after any `knip`-driven cleanup to avoid silently breaking the build or test environment. Use `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to verify.

## 2026-04-23 - Cleaned up unused files and dead code with knip
**Learning:** `knip` often correctly identifies completely dead files and code, but you must manually check if they are implicitly used by configurations, scripts or test-runners. For example, `src/node-setup.ts`, `tests/e2e/test-utils.ts`, `vite-plugins/pokedata-plugin.ts` and `scripts/generate-pokedata.ts` were flagged by `knip --production` but are strictly required. Removing those will break tests and the build setup. Before submitting, always ensure to run `pnpm lint && pnpm test && pnpm test:e2e` to catch such broken functionality locally.
**Action:** Be extremely cautious to evaluate if `knip`'s findings are actually dead files, or simply testing/build artifacts. Double check with a repository-wide search (`grep`).

## 2026-04-27 - Resolved tech debt flagged by knip
- Resolved tech debt flagged by `knip`.
- Deleted dead code (`src/db/SaveDB.ts`).
- Removed unused `export` statements from internal types.
- Critical learning: Knip does not natively parse `lefthook.yml` scripts, so `scripts/**` must be added to the ignore list in `knip.json` to prevent them from being flagged as unused.
