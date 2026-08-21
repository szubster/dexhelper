1. **Add `isGen2Save` and `isGen3Save` Type Guards**
   - File: `src/engine/saveParser/parsers/common.ts`
   - Add two exported functions:
     - `export function isGen2Save(saveData: SaveData): saveData is Gen2SaveData { return saveData.generation === 2; }`
     - `export function isGen3Save(saveData: SaveData): saveData is Gen3SaveData { return saveData.generation === 3; }`
2. **Refactor `breedGenerator.ts` to Use Type Guard**
   - File: `src/engine/assistant/generators/breedGenerator.ts`
   - Import `isGen2Save` from `../../saveParser/parsers/common`.
   - Before evaluating `daycare` logic, assign a strongly typed variable `const gen2Data = isGen2Save(saveData) ? saveData : null;`.
   - Replace messy type casts `('daycare' in saveData ? (saveData.daycare as PokemonInstance[]) : [])` and `('daycare' in saveData ? saveData.daycare : undefined)` with safe access via `gen2Data?.daycare` and `gen2Data?.daycareHasEgg`.
3. **Verify compilation and tests**
   - Run `pnpm lint`, `pnpm test`, `xvfb-run pnpm test:e2e` to ensure no regressions.
4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
5. **Submit PR**
   - Title: `🛡️ Nurse: [type improvement] Remove unsafe 'as' casts for Gen 2 Daycare in breedGenerator`
   - Body: Replaced loose `in` operator checks and `as` casts with a proper discriminated union type guard `isGen2Save` to narrow `SaveData`.
