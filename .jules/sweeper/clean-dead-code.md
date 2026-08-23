# Sweeper Journal - Clean Dead Code
Date: $(date +%Y-%m-%d)

## What was done
1. Identified unused exports / dead files via `pnpm knip`.
2. Specifically, `src/engine/saveParser/utils/index.ts` was not used anywhere (it used to export `gen1EventFlags` and `gen2EventFlags` which are now directly imported).
3. The directory `src/engine/saveParser/gen3/mixedRecords` contained types and constants (`constants.ts`, `types.ts`, `types.test.ts`) that were completely unused in the main codebase (only used by the local tests which have now been removed as well).
4. Removed these from `knip.json`'s ignore list.
5. All local and global references were checked using `grep` prior to removal.
