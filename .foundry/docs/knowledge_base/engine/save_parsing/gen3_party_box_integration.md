# Gen 3 Party and Box Parsing Integration

## Strategy

To integrate Gen 3 Party and PC Box parsing into `parseGen3` for downstream features like contest data mapping:

1. **Condition Stats Extraction**
   - Use the existing `parseGen3ConditionStats(view: DataView, offset: number)` function.
   - The Condition Stats are located in the **EVs & Condition (E)** substructure, which is at offset `2 * SUBSTRUCTURE_SIZE` (where `SUBSTRUCTURE_SIZE = 12`) within the decrypted 48-byte `decryptedData` block.
   - Call `parseGen3ConditionStats(decryptedData, 2 * SUBSTRUCTURE_SIZE)`.

2. **Ribbons Extraction**
   - Use the existing `parseGen3Ribbons(view: DataView, offset: number)` function.
   - Contest Ribbons are stored as a 32-bit bitfield in the **Miscellaneous (M)** substructure at offset 8.
   - The M substructure is at offset `3 * SUBSTRUCTURE_SIZE` within the decrypted 48-byte `decryptedData` block.
   - Define a constant `export const RIBBONS_OFFSET_IN_M = 0x08;` in `src/engine/saveParser/parsers/gen3.ts`.
   - Call `parseGen3Ribbons(decryptedData, 3 * SUBSTRUCTURE_SIZE + RIBBONS_OFFSET_IN_M)`.

3. **Integration Points**
   - In `parseGen3Party`, append the extracted `condition` and `ribbons` objects to the `PokemonInstance` constructed for each party member and pushed to `partyDetails`.
   - In `parseGen3PCBoxes`, append the extracted `condition` and `ribbons` objects to the `PokemonInstance` constructed for each box member and pushed to `pcDetails`.
