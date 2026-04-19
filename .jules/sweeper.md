## 2026-04-19 - Cleaned up unused constants in gen1 assistantData
**Learning:** Found `GEN1_ITEMS` and `OBEDIENCE_CAPS` in `src/engine/data/gen1/assistantData.ts` which were not imported or used anywhere else in the application. `knip` tool or targeted `grep` commands are useful for finding such dead code.
**Action:** Always verify potential unused exports by doing a global repository search to ensure they aren't dynamically referenced or used in tests before removing them.
