# Gen 3 PC Box Memory Offsets

This document outlines the memory offsets, structures, and layout used for PC Box data in Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen). This information is necessary for extracting owned Pokémon and their Box/Slot configurations for the Living Dex.

References:
- Bulbapedia: [Save data structure (Generation III)](https://bulbapedia.bulbagarden.net/wiki/Save_data_structure_(Generation_III))
- Bulbapedia: [Pokémon data structure (Generation III)](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_data_structure_(Generation_III))

## PC Buffer Organization (Sections 5-13)

In Generation 3, the Pokémon Storage System (PC buffer) is split across multiple 4KB sections within the save file. Specifically, it occupies **9 sections** (Logical Sections 5 through 13).

- **Sections 5 through 12**: Each contain 3968 bytes of PC buffer data.
- **Section 13**: Contains the remaining 2000 bytes.
- **Total PC Buffer Size**: 33,744 bytes.

The PC buffer bytes are contiguous across these sections. When mapping offsets, the first byte of the PC buffer (`0x0000`) is located at the start of the data payload in Logical Section 5. Byte `3968` of the buffer is located at the start of Logical Section 6, and so on.

### PC Buffer Layout

The complete 33,744 byte PC buffer is laid out as follows:

| Offset within PC Buffer | Size (Bytes) | Contents |
| :--- | :--- | :--- |
| `0x0000` | 4 | Current PC Box (Index of the most recently viewed box, minus 1) |
| `0x0004` | 33,600 | PC Boxes Pokémon list (Array of 420 Pokémon records) |
| `0x8344` | 126 | Box names (14 boxes × 9 bytes each) |
| `0x83C2` | 14 | Box wallpapers (14 boxes × 1 byte each) |

## PC Box Pokémon List

The PC Box Pokémon list starts at offset `0x0004` within the PC buffer. It contains **420** Pokémon records.
- There are 14 boxes in total.
- Each box holds 30 Pokémon (arranged in a 5 rows × 6 columns grid).
- Records are ordered left-to-right, top-to-bottom per box. (Records 0-29 belong to Box 1, Records 30-59 to Box 2, etc.)

### PC Pokémon Data Structure

While a full Generation 3 Pokémon record (e.g., in the party) is 100 bytes long, **Pokémon stored in the PC only utilize the first 80 bytes**. The remaining 20 bytes (which cover volatile battle stats, current HP, level, status conditions, etc.) are discarded to save space and regenerated when the Pokémon is withdrawn from the PC.

Empty slots in a PC box are represented by 80 bytes of `0x00`.

The 80-byte structure is as follows:

| Offset within Record | Size (Bytes) | Field |
| :--- | :--- | :--- |
| `0x00` | 4 | Personality value (`u32`) |
| `0x04` | 4 | Original Trainer (OT) ID (`u32`) |
| `0x08` | 10 | Nickname (`u8[10]`) |
| `0x12` | 1 | Language (`u8`) |
| `0x13` | 1 | Misc. Flags (`u8`) |
| `0x14` | 7 | OT name (`u8[7]`) |
| `0x1B` | 1 | Markings (`u8`) |
| `0x1C` | 2 | Checksum (`u16`) |
| `0x1E` | 2 | Unknown/Padding (`u16`) |
| `0x20` | 48 | Data / Substructures (`u8[48]`) |

The `Data` block (48 bytes starting at offset `0x20`) is encrypted via XOR with a key derived from the Personality Value and OT ID. It contains 4 substructures of 12 bytes each, determining the Pokémon's species, item, moves, IVs, EVs, and other core attributes. (In party pokemon, the data after these 80 bytes starts at `0x50` with Status condition).