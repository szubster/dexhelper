# Gen 3 Fame Checker Event Flags & Memory Offsets: Gym Leaders

This document tracks the memory layout and data structures used to store Fame Checker progress in Pokémon FireRed and LeafGreen, specifically focusing on the Gym Leaders.

## Data Structure

Based on the `pret/pokefirered` decompilation project (specifically `include/global.h`), the Fame Checker progress is stored within `SaveBlock1` starting at offset `0x3A54`.

The game tracks progress using an array of structures:

```c
struct FameCheckerSaveData fameChecker[NUM_FAMECHECKER_PERSONS];
```

Each person in the Fame Checker is represented by a `struct FameCheckerSaveData`, which is exactly a 16-bit (`u16`) bitfield structured as follows:

```c
struct FameCheckerSaveData
{
    u16 pickState:2;         // Bits 0-1
    u16 flavorTextFlags:12;  // Bits 2-13
    u16 unk_0_E:2;           // Bits 14-15
};
```

**Understanding `flavorTextFlags`:**
The `flavorTextFlags` bitfield is responsible for tracking which of the 6 lore entries the player has unlocked for a specific person. Because this field starts at bit 2 of the 16-bit structure, the actual unlocked entries correspond to **Bits 2 through 7** (inclusive) of the `u16` value for that person.

*   Bit 2: Entry 1 unlocked (1 = yes, 0 = no)
*   Bit 3: Entry 2 unlocked
*   Bit 4: Entry 3 unlocked
*   Bit 5: Entry 4 unlocked
*   Bit 6: Entry 5 unlocked
*   Bit 7: Entry 6 unlocked

## Gym Leader Offsets

The indices for each character are defined in `include/constants/fame_checker.h`. The Gym Leaders occupy indices 2 through 8. Because each structure is 2 bytes long, we can calculate the exact absolute offset within `SaveBlock1` by taking the base offset (`0x3A54`) and adding `Index * 2`.

| Gym Leader | Fame Checker Index | SaveBlock1 Offset |
| :--- | :--- | :--- |
| **Brock** | 2 | `0x3A58` |
| **Misty** | 3 | `0x3A5A` |
| **Lt. Surge** | 4 | `0x3A5C` |
| **Erika** | 5 | `0x3A5E` |
| **Koga** | 6 | `0x3A60` |
| **Sabrina** | 7 | `0x3A62` |
| **Blaine** | 8 | `0x3A64` |

*Note: Giovanni (Index 15) is considered a Gym Leader in-game but often grouped with other major characters. His offset would be `0x3A72`. Lorelei, Bruno, Agatha, and Lance (Elite Four) occupy indices 9-12.*

## Reading the Data
To check if a specific entry is unlocked for a Gym Leader, read the `u16` value at their specific `SaveBlock1` offset (e.g., `0x3A58` for Brock). Then, right-shift the value by 2 to align the `flavorTextFlags` to the 0th bit, and apply a bitwise AND mask to check the specific entry index (0-5).

```javascript
// Example extracting Brock's entry 3 (index 2)
const brockOffset = 0x3A58;
const brockData = dataView.getUint16(saveBlock1Start + brockOffset, true);
const flavorTextFlags = (brockData >> 2) & 0x0FFF;
const hasEntry3 = (flavorTextFlags & (1 << 2)) !== 0;
```
