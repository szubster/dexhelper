# Generic Pokémon Save File Architecture (Gen 1 & 2)

This document provides a high-level overview of how Pokémon save files for the Game Boy and Game Boy Color are structured.

## 1. SRAM Architecture
Pokémon save files are raw dumps of the cartridge's **SRAM (Static RAM)**. This RAM is battery-backed and traditionally 32KB in size.

### Memory Banking
The 32KB SRAM is divided into four **8KB Banks** (Bank 0, 1, 2, 3).
- **Bank 0**: General game state, often not used for primary save data in some versions.
- **Bank 1**: The "Main" save data bank. Contains trainer info, party, items, and current PC box.
- **Bank 2 & 3**: PC Box data. Because a single box (20 mons * 32 bytes) is large, only the current box is kept in Bank 1 for performance; the rest are "swapped" out to Banks 2 and 3.

## 2. RAM Mirroring
The save file structure is often a direct mirror of the console's **WRAM (Work RAM)**.
- While the game is running, it operates on data in the `0xC000-0xDFFF` (WRAM) region.
- When the player saves, the game copies relevant blocks of WRAM into the SRAM (Save File).
- This is why "RAM Addresses" (e.g., `0xDAAF`) often correlate directly to "Save Offsets" if you account for the base offset (usually `0x2000` or similar depending on the bank).

## 3. The "Shift" Phenomenon
Offsets vary between game versions (e.g., Red vs. Blue, or GS vs. Crystal) due to:
- **Engine Size**: New features (like Crystal's Battle Tower) add code and static data, pushing later RAM blocks "down" to higher addresses.
- **Regional Variations**: Localizing strings (JPN vs. USA) sometimes changes fixed-length buffers, causing shift.

## 4. Checksums
Most save blocks have a **Checksum byte** at the end.
- If the calculated sum of bytes in a block does not match the checksum byte, the game declares the save "corrupted".
- When modifying save files programmatically, the checksum must be recalculated for the game to accept the changes.

## 5. Standard Layout (Gen 2 Bank 1)
| Feature | Approx. Location | Notes |
| :--- | :--- | :--- |
| **Trainer ID/Name** | `0x2000-0x2050` | Early in Bank 1 |
| **Inventory** | `0x2300-0x2500` | Items, Key Items, TMs |
| **Event Flags** | `0x2900-0x2A00` | Progress bits |
| **Pokedex** | `0x2A00-0x2B00` | Seen/Caught masks |
| **Daycare** | `0x2800` or `0x2A00` | Varies by version |
| **Party** | `0x2800-0x2900` | Current 6 Pokémon |
