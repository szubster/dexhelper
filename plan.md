1. **Define Constants in gen3.ts**:
   Use `replace_with_git_merge_diff` to rename `const GROWTH_FRIENDSHIP_OFFSET = 0x04;` to `export const GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G = 0x04;`, export `LOWER_8_BIT_MASK`, and update `parseGen3EggSteps` to use `GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G`.
```
<<<<<<< SEARCH
const SAVE_BLOCK_B = 0xe000;
export const LOWER_16_BIT_MASK = 0xffff;
const LOWER_8_BIT_MASK = 0xff;
=======
const SAVE_BLOCK_B = 0xe000;
export const LOWER_16_BIT_MASK = 0xffff;
export const LOWER_8_BIT_MASK = 0xff;
>>>>>>> REPLACE
```
```
<<<<<<< SEARCH
const MISC_IV_EGG_ABILITY_OFFSET = 0x04;
export const MET_LOCATION_OFFSET_IN_M = 1;
const IS_EGG_BIT_SHIFT = 30;
const GROWTH_FRIENDSHIP_OFFSET = 0x04;
const EGG_CYCLE_STEPS = 256;
=======
const MISC_IV_EGG_ABILITY_OFFSET = 0x04;
export const MET_LOCATION_OFFSET_IN_M = 1;
const IS_EGG_BIT_SHIFT = 30;
export const GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G = 0x04;
const EGG_CYCLE_STEPS = 256;
>>>>>>> REPLACE
```
```
<<<<<<< SEARCH
    const eggCycles = view.getUint8(growthSubstructureOffset + GROWTH_FRIENDSHIP_OFFSET);
    return eggCycles * EGG_CYCLE_STEPS;
=======
    const eggCycles = view.getUint8(growthSubstructureOffset + GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G);
    return eggCycles * EGG_CYCLE_STEPS;
>>>>>>> REPLACE
```
2. **Implement `parseGen3PokemonFriendship` helper**:
   Use `replace_with_git_merge_diff` on `src/engine/saveParser/parsers/gen3.ts` to add the exact `parseGen3PokemonFriendship` function.
```
<<<<<<< SEARCH
export function parseGen3PokemonPVAndIVs(view: DataView, offset: number) {
=======
export function parseGen3PokemonFriendship(view: DataView, offset: number): number {
  try {
    const pv = view.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
    const otId = view.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

    const decryptionKey = pv ^ otId;
    const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
    const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
    if (!permutation) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    const indexOfG = permutation.indexOf('G');

    const growthSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfG * SUBSTRUCTURE_SIZE;
    const encryptedFriendship = view.getUint32(growthSubstructureOffset + GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G, true);
    return (encryptedFriendship ^ decryptionKey) & LOWER_8_BIT_MASK;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3PokemonPVAndIVs(view: DataView, offset: number) {
>>>>>>> REPLACE
```
3. **Integrate into PC Box Parsing**:
   Use `replace_with_git_merge_diff` on `src/engine/saveParser/parsers/gen3.ts` to update `parseGen3PCBoxes`.
```
<<<<<<< SEARCH
        const isShiny = false; // We can skip full shiny calculation for PC boxes for now unless requested

        const p: import('./common').PokemonInstance = {
          hash: `${pv}-${otId}`,
          speciesId,
          level: 1, // PC pokemon don't have level in the 80 bytes, it's generated on withdrawal.
          isShiny,
          item: item > 0 ? item : undefined,
          moves,
          storageLocation: `Box ${box + 1}`,
          slot,
        };
=======
        const encryptedFriendship = pcBufferView.getUint32(growthSubstructureOffset + GEN3_POKEMON_FRIENDSHIP_OFFSET_IN_G, true);
        const friendship = (encryptedFriendship ^ decryptionKey) & LOWER_8_BIT_MASK;

        const isShiny = false; // We can skip full shiny calculation for PC boxes for now unless requested

        const p: import('./common').PokemonInstance = {
          hash: `${pv}-${otId}`,
          speciesId,
          level: 1, // PC pokemon don't have level in the 80 bytes, it's generated on withdrawal.
          isShiny,
          item: item > 0 ? item : undefined,
          moves,
          friendship,
          storageLocation: `Box ${box + 1}`,
          slot,
        };
>>>>>>> REPLACE
```
4. **Verify gen3.ts modifications**:
   Use `read_file` on `src/engine/saveParser/parsers/gen3.ts` to confirm the changes were written correctly.
5. **Update Tests**:
   Use `replace_with_git_merge_diff` to modify `src/engine/saveParser/parsers/gen3.test.ts` to export the new functions and add the test logic for `parseGen3PokemonFriendship`.
```
<<<<<<< SEARCH
  parseGen3EmeraldMoveTutors,
=======
  parseGen3PokemonFriendship,
  parseGen3EmeraldMoveTutors,
>>>>>>> REPLACE
```
```
<<<<<<< SEARCH
describe('parseGen3PokemonPVAndIVs', () => {
=======
describe('parseGen3PokemonFriendship', () => {
  it('should extract the friendship value correctly for permutation GAEM', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const pv = 0; // PV % 24 = 0 -> GAEM
    const otId = 12345;
    const decryptionKey = pv ^ otId;

    view.setUint32(0, pv, true); // PV
    view.setUint32(4, otId, true); // OT ID

    const growthOffset = 32 + 0 * 12;
    // Set friendship to 255. Friendship is at offset 4 of Growth, so we XOR the 32-bit word with decryptionKey
    const friendshipWord = 255; // 255 in lower 8 bits
    view.setUint32(growthOffset + 4, friendshipWord ^ decryptionKey, true);

    const result = parseGen3PokemonFriendship(view, 0);
    expect(result).toBe(255);
  });

  it('should extract the friendship value correctly for permutation MGEA', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const pv = 19; // PV % 24 = 19 -> MGEA
    const otId = 54321;
    const decryptionKey = pv ^ otId;

    view.setUint32(0, pv, true); // PV
    view.setUint32(4, otId, true); // OT ID

    const growthOffset = 32 + 1 * 12;
    const friendshipWord = 120;
    view.setUint32(growthOffset + 4, friendshipWord ^ decryptionKey, true);

    const result = parseGen3PokemonFriendship(view, 0);
    expect(result).toBe(120);
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    const buffer = new ArrayBuffer(30);
    const view = new DataView(buffer);

    // Buffer is too small, reading PV or OT ID will throw RangeError
    expect(() => parseGen3PokemonFriendship(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3PokemonPVAndIVs', () => {
>>>>>>> REPLACE
```
6. **Verify tests modifications**:
   Use `read_file` on `src/engine/saveParser/parsers/gen3.test.ts` to confirm the changes were written correctly.
7. **Check Off Acceptance Criteria**:
   Use `replace_with_git_merge_diff` on `.foundry/tasks/task-152-258-gen3-friendship-impl.md` to check off the acceptance criteria checkboxes.
```
<<<<<<< SEARCH
## Acceptance Criteria
- [ ] Create constants for all memory offsets (e.g., Growth substructure offset, Friendship offset within Growth, etc.).
- [ ] Implement utility/logic to determine the `PV % 24` permutation.
- [ ] Implement logic to extract the Friendship byte from the Data block using the `DataView` API.
- [ ] Integrate or prepare the logic for Party and PC Box parsing.
- [ ] Write unit tests verifying Friendship extraction works for various `PV % 24` permutations.
=======
## Acceptance Criteria
- [x] Create constants for all memory offsets (e.g., Growth substructure offset, Friendship offset within Growth, etc.).
- [x] Implement utility/logic to determine the `PV % 24` permutation.
- [x] Implement logic to extract the Friendship byte from the Data block using the `DataView` API.
- [x] Integrate or prepare the logic for Party and PC Box parsing.
- [x] Write unit tests verifying Friendship extraction works for various `PV % 24` permutations.
>>>>>>> REPLACE
```
8. **Verify checkbox modifications**:
   Use `read_file` on `.foundry/tasks/task-152-258-gen3-friendship-impl.md` to confirm the changes were written correctly.
9. **Run lint and tests**:
   Run `pnpm lint && pnpm test && xvfb-run pnpm test:e2e` to verify the changes and ensure the tests pass.
10. **Pre-commit**: Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
11. **Submit**: Create PR.
