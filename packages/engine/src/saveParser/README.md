# Save Parser Architecture

The `saveParser` module is responsible for reading raw binary Game Boy Pokémon save files (`.sav`), verifying their integrity, and extracting player state into a structured JSON format (`SaveData`).

## Architecture

- **`index.ts` (Entry Point):** Determines whether the uploaded file is a Generation 1 or Generation 2 save. It calculates checksums across specific memory blocks and falls back to structural validation (like valid party counts and terminator bytes) if checksums are corrupted.
- **`parsers/gen1.ts`:** Handles Red, Blue, and Yellow saves.
- **`parsers/gen2.ts`:** Handles Gold, Silver, and Crystal saves.
- **`parsers/gen3.ts`:** Handles Ruby, Sapphire, Emerald, FireRed, and LeafGreen saves.
- **`parsers/common.ts`:** Contains shared utilities like text decoding (converting proprietary character encoding to UTF-8), IV/DV parsing (for stats and shiny checks), and type definitions.

## Memory Offsets & Heuristics

Because these games lack self-describing structures, parsing relies on hardcoded binary offsets.

### Generation 1 (R/B/Y)
Gen 1 games do not explicitly state their version in the save file. Furthermore, Yellow version shifted many core memory offsets by `+1` byte to accommodate Pikachu's friendship data.
- **Version Detection:** We infer the version by analyzing the Pokédex (exclusive Pokémon seen/owned) and looking for Yellow-specific markers (e.g., Pikachu happiness at `0x271D`).
- **Dynamic Offsets:** `parseGen1` dynamically probes the Pokédex padding bit at offsets `0x25A3` and `0x25A4`. Depending on which padding bit is correctly zeroed out, the parser shifts subsequent reads by `0` or `+1`.

### Generation 2 (G/S/C)
Gen 2 saves are significantly larger and employ a two-block system (a main save and a backup save) to prevent corruption.
- **Offsets:** Unlike Gen 1, Gen 2 offsets are more standardized, though Japanese versions still differ from International ones.
- **Checksums:** Gen 2 uses a robust checksum stored at `0x2D0D` (sum of bytes from `0x2009` to `0x2D0C`), which allows `index.ts` to easily validate the save file.

### Generation 3 (R/S/E/FR/LG)
Generation 3 introduces a complex A/B flash memory architecture to prevent data corruption.
- **Flash Memory Banks:** The game alternates writing between two 56KB blocks (`0x0000` and `0xE000`). Each block is further divided into 14 4KB sections.
- **Section Resolution:** The parser must scan both banks, verify the signature (`0x08012025`), and compare `saveIndex` values to locate the most recent, non-corrupted data sections (SaveBlock1 for player data, SaveBlock2 for system data).
- **Encrypted Structures:** Individual Pokémon data structures are 100 bytes long, with a 48-byte encrypted substructure block. The decryption key is derived from the Pokémon's Personality Value (PV) XORed with the Original Trainer (OT) ID, and the substructure permutation (e.g., GAEM vs MGEA) is determined by `PV % 24`.

## Why this matters?
Documenting these offsets, architectures, and heuristics is crucial because a 1-byte misalignment will cascade, resulting in corrupted party data, missing inventory, and incorrect location mappings.
