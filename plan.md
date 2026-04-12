1. **Analyze the Problem**: `src/engine/saveParser/index.ts` is large (~1000 lines) and handles both Gen 1 and Gen 2 save parsing. This file could be refactored by breaking out the specific parsing logic (`parseGen1`, `parseGen2`, etc.) into smaller, specific files in a `parsers/` directory, while keeping `index.ts` as the entrypoint.

2. **Structure**:
   - `src/engine/saveParser/parsers/common.ts`: Contains shared logic like `byte`, `decodeGen12String`, `parseDVs`, `checkShiny`.
   - `src/engine/saveParser/parsers/gen1.ts`: Contains `parseGen1`, `detectGen1GameVersion`, `isGen1Save`.
   - `src/engine/saveParser/parsers/gen2.ts`: Contains `parseGen2`, `parseCaughtData`, `detectGen2GameVersion`, `isGen2Save`.
   - `src/engine/saveParser/index.ts`: Re-exports types and the main `parseSaveFile` function which delegates to the specific parsers. It will import `INTERNAL_ID_TO_DEX` which might need to go to a separate `data.ts` or stay in `index.ts` or `gen1.ts`. Actually `INTERNAL_ID_TO_DEX` is mostly gen 1. Let's move it to `gen1.ts` or a new `data.ts`. But it is exported from `index.ts` currently. I will keep it exported from `index.ts` or re-export it.

3. **Dependencies**: Ensure all imports in tests and other parts of the codebase still work by re-exporting necessary items from `index.ts`.

4. **Verify**: Run `npx tsc --noEmit`, `npx biome check .`, and `npm test` to ensure nothing is broken.

5. **Pre-commit Instructions**: Run the required pre-commit instructions.
