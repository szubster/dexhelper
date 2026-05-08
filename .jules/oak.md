# Oak - Data Integrity Journal

## Critical Learnings

- **ROM Mapping:** The `scripts/generateMapLocations.ts` script parses decompiled Gen 1 and Gen 2 ROM mapping data. The internal ID is calculated as `(group << 8) | id`.
- **Gen 2 Version Exclusives:** The arrays in `engine/exclusives/gen2Exclusives.ts` define Pokémon missing from that version (exclusion lists). For example, the `gold` array lists Pokémon unobtainable in Silver.
- **Bug Catching Contest Data:** PokeAPI does not include the Bug Catching Contest encounters. DexHelper injects this data manually in `scripts/generate-pokedata.ts`.
- **Encounter Rates:** The previous script had a bug where Metapod and Kakuna had a 20% encounter rate in the Bug Catching Contest instead of the canonical 10%. This caused the total encounter percentages to exceed 100%. This has been fixed to match canonical Gen 2 data.
- **Version Exclusives Lists:** The hardcoded `gen1Exclusives.ts` and `gen2Exclusives.ts` correctly represent the "missing from this game" lists according to Bulbapedia / canonical sources.
