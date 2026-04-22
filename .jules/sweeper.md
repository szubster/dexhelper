## 2026-04-19 - Cleaned up unused constants in gen1 assistantData
**Learning:** Found `GEN1_ITEMS` and `OBEDIENCE_CAPS` in `src/engine/data/gen1/assistantData.ts` which were not imported or used anywhere else in the application. `knip` tool or targeted `grep` commands are useful for finding such dead code.
**Action:** Always verify potential unused exports by doing a global repository search to ensure they aren't dynamically referenced or used in tests before removing them.

## 2026-04-22 - Cleaned up unused exports and dead code with knip
**Learning:** `knip` is highly effective at identifying unused types and functions, but manual verification is crucial. Removing types and function exports works well, but one must be very careful when `knip` marks entire files (like `src/test-setup.ts`) as unused, as they may be required by configuration files or test runners implicitly. Similarly, `knip` might complain about "unused" `devDependencies` like `fake-indexeddb` when they are actually implicitly used.
**Action:** Always verify test and lint commands after any `knip`-driven cleanup to avoid silently breaking the build or test environment. Use `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to verify.
