# Scribe Journal

- **2024-03-XX:** Documented the `detectVersionAndOffsets` function in `src/engine/saveParser/parsers/gen1.ts`. Discovered that the Pokémon Yellow +1 offset shift heuristic works by explicitly checking the 152nd bit (byte 19, MSB) of the Pokédex "Owned" and "Seen" flags array. Because there are only 151 Pokémon, this bit must always be `0`. By checking this padding bit at `0x25a3` vs `0x25a4`, the parser can safely identify the correct memory alignment without explicit version flags.
