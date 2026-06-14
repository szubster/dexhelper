# Gen 3 Match Call Memory Offsets

This document outlines the memory offsets, structures, and bitflags used by the **Match Call** system in Pokémon Emerald, as researched from the `pret/pokeemerald` decompilation.

## 1. Match Call Memory Block (`trainerRematches`)

The primary Match Call data block stores both the "ready to rematch" status and the specific "rematch tier" (the index of the team to fight next) for all registered trainers.

- **Logical Offset:** `0x09CA` inside `SaveBlock1`
- **Data Type:** Array of `u8` (length 100, representing `MAX_REMATCH_ENTRIES`)
- **Total Size:** 100 bytes

### Mapping to Logical 4KB Save Sections

`SaveBlock1` spans four 4KB save sections starting from Section 1 (`SECTOR_ID_SAVEBLOCK1_START`).
- Since Section 1 holds bytes `0x0000` to `0x0F7F` (3968 bytes total), the `trainerRematches` array at offset `0x09CA` (2506 in decimal) falls entirely within **Section 1**.
- **Section 1 Offset:** `0x09CA`

### Rematch Readiness and Tier States

The 1-byte value at `trainerRematches[index]` serves a dual purpose:
- **Rematch Readiness:** A value of `0` indicates the trainer is *not* ready for a rematch. A value `> 0` means they are ready.
- **Rematch Tier State:** The value itself (if `> 0`) represents the internal index (`i` in `gRematchTable[tableId].trainerIds[i]`) of the opponent's team. This tracks their current level/tier progression.

## 2. Match Call Registered Trainer Flags

Whether a specific trainer is "registered" in the PokéNav is tracked by individual bits inside the global `flags` array.

- **Global Flags Offset:** `0x1270` inside `SaveBlock1`
- **Starting Flag ID:** `TRAINER_REGISTERED_FLAGS_START` is defined as `0x15C` (348).
- **Flag Count:** `REMATCH_TABLE_ENTRIES` is 78, taking up approximately 10 bytes of flags.

### Mapping to Logical 4KB Save Sections

The `flags` array starts at logical offset `0x1270` (4720 in decimal).
- Because 4720 > 3968, this data spills over into **Section 2**.
- **Section 2 Offset:** `4720 - 3968 = 752` (`0x02F0`).
- So the `flags` array starts at `0x02F0` inside Section 2.

### Bitwise Locations for Registered Flags

To compute the specific byte and bit for `TRAINER_REGISTERED_FLAGS_START` (`0x15C` or 348):
- **Byte Offset within `flags` array:** `348 / 8 = 43` (`0x2B`)
- **Bit Index:** `348 % 8 = 4` (Bit 4)
- **Section 2 Offset:** `752 + 43 = 795` (`0x031B`)

The flags continue sequentially for 78 bits, ending at byte 53 inside the `flags` array (Section 2 Offset `0x0325`).

## 3. General Match Call Unlock Flag

The system also uses a single boolean flag `FLAG_HAS_MATCH_CALL` (`0x12F` or 303) to denote whether the player has received the Match Call feature entirely.

- **Byte Offset within `flags` array:** `303 / 8 = 37` (`0x25`)
- **Bit Index:** `303 % 8 = 7` (Bit 7)
- **Section 2 Offset:** `752 + 37 = 789` (`0x0315`)

## References

1. `pret/pokeemerald` source code (`include/global.h`, `include/save.h`, `include/constants/flags.h`, `src/battle_setup.c`)
2. Bulbapedia Save Data Structure (Generation III): https://bulbapedia.bulbagarden.net/wiki/Save_data_structure_(Generation_III)