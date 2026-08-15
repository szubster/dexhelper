# Research Gen 3 Party and PC Box Memory Offsets

This document outlines the memory offsets, structures, and layout used for Party Pokémon and PC Box Pokémon data in Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen). This information is necessary for accurate data extraction of PIDs and other Pokémon attributes.

References:
- Bulbapedia: [Save data structure (Generation III)](https://bulbapedia.bulbagarden.net/wiki/Save_data_structure_(Generation_III))
- Bulbapedia: [Pokémon data structure (Generation III)](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_data_structure_(Generation_III))

## Party Pokémon

Party Pokémon data is located within Logical **Section 1 (Team / Items)** of the Gen 3 save file.

### Party Offsets
| Offset within Section 1 | Size (Bytes) | Field | Description |
| :--- | :--- | :--- | :--- |
| `0x0234` (RS/E) / `0x0034` (FRLG) | 4 (RS/E) / 1 (FRLG) | Team size | The number of Pokémon currently on the team (0-6). |
| `0x0238` (RS/E) / `0x0038` (FRLG) | 600 | Team Pokémon list | An array of 6 Pokémon records. Each record is 100 bytes long. |

### Party Pokémon Data Structure (100 Bytes)
A full Generation 3 Pokémon record in the party is 100 bytes long.

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
| `0x20` | 48 | Data / Substructures (`u8[48]`) - Encrypted |
| `0x50` | 4 | Status condition (`u32`) |
| `0x54` | 1 | Level (`u8`) |
| `0x55` | 1 | Mail ID (`u8`) |
| `0x56` | 2 | Current HP (`u16`) |
| `0x58` | 2 | Total HP (`u16`) |
| `0x5A` | 2 | Attack (`u16`) |
| `0x5C` | 2 | Defense (`u16`) |
| `0x5E` | 2 | Speed (`u16`) |
| `0x60` | 2 | Sp. Attack (`u16`) |
| `0x62` | 2 | Sp. Defense (`u16`) |

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

### PC Pokémon Data Structure (80 Bytes)

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
| `0x20` | 48 | Data / Substructures (`u8[48]`) - Encrypted |

## PID (Personality Value)

The Personality Value (PID) is a 32-bit unsigned integer (`u32`) that is critical for determining many attributes of a Pokémon.

- **Location**: It is always located at **offset `0x00`** (the very first 4 bytes) of both the 100-byte Party Pokémon structure and the 80-byte PC Pokémon structure.
- **Size**: 4 bytes.
- **Role**: It is used along with the OT ID (at offset `0x04`) as the key to decrypt the 48-byte Data block (offset `0x20`). It also determines Nature, Gender, Ability, Spinda spots, Unown letter, Shininess, and the internal substructure order.
