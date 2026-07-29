1. **Define Constants in `src/engine/saveParser/parsers/gen3.ts`:**
   - Define constants for the 100-byte structure: `GEN3_POKEMON_STRUCT_SIZE = 100`, `GEN3_POKEMON_PV_OFFSET = 0`, `GEN3_POKEMON_OT_ID_OFFSET = 4`, `GEN3_POKEMON_DATA_OFFSET = 32`.
   - Define constants for IV extraction within the Miscellaneous substructure: `MISC_IVS_OFFSET = 4`, `SUBSTRUCTURE_SIZE = 12`.
   - The IV masks and shifts (`IV_MASK`, `IV_SHIFT_HP`, etc.) are already defined.
   - Define the permutation table: `export const SUBSTRUCTURE_ORDER = [...]` (an array of 24 strings).

2. **Implement `parseGen3PokemonPVAndIVs` function in `src/engine/saveParser/parsers/gen3.ts`:**
   - The user task requires PV and IV data extraction.
   - I'll create `export function parseGen3PokemonPVAndIVs(view: DataView, offset: number): { hp: number, attack: number, defense: number, speed: number, specialAttack: number, specialDefense: number, pv: number }`.
   - Read PV at `offset + 0` (4 bytes, little-endian).
   - Read OT ID at `offset + 4` (4 bytes, little-endian).
   - Decryption key = `PV ^ OT_ID`.
   - `permutation_index = PV % 24`.
   - Look up the permutation from the `SUBSTRUCTURE_ORDER` array.
   - Find the index of `'M'` (Miscellaneous) in the permutation string using `.indexOf('M')`.
   - The `M` substructure starts at `offset + 32 + (indexOfM * 12)`.
   - The IVs are at offset 4 of the `M` substructure. Read the 32-bit encrypted IV block at `offset + 32 + (indexOfM * 12) + 4`.
   - Decrypt this 32-bit word by XORing it with the decryption key.
   - Extract IVs using the bit shifts and `IV_MASK`: `hp = (decryptedIVs >> IV_SHIFT_HP) & IV_MASK`, etc.
   - Catch `RangeError` and throw `new Error('The save file is corrupted or incomplete.')`.

3. **Add Tests in `src/engine/saveParser/parsers/gen3.test.ts`:**
   - Test PV and IV extraction with a known payload. (I will construct an array buffer).
   - Test out-of-bounds `RangeError` for `parseGen3PokemonPVAndIVs`.

4. **Update `.foundry/tasks/task-346-352-gen3-pv-iv-extraction-impl.md`:**
   - Mark checkboxes as `[x]`.

5. **Pre-commit Instructions:**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
