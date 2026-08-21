# Gen 3 Fame Checker - Notable NPCs Event Flags

## Overview
This document outlines the memory layout and event flags used to track the Fame Checker progress for notable NPCs (such as Oak, Daisy, Bill, and Mr. Fuji) in Pokémon FireRed and LeafGreen.

Based on the FireRed decompilation source code (`/tmp/pokefirered/include/global.h` and `/tmp/pokefirered/include/constants/fame_checker.h`), the Fame Checker data is stored in a specific array within `SaveBlock1`.

## Memory Structure
The Fame Checker data is represented by an array of 16 structures (`NUM_FAMECHECKER_PERSONS = 16`). The array is located at offset `0x3A54` within `SaveBlock1`.

Each entry in this array maps to a specific person and is exactly 2 bytes (16 bits) in size. The structure is defined as follows:

```c
struct FameCheckerSaveData
{
    u16 pickState:2;         // 2 bits: 0 = NO_DRAW, 1 = SILHOUETTE, 2 = COLORED
    u16 flavorTextFlags:12;  // 12 bits: Bitmask for unlocked flavor texts (typically 6 texts, bits 0-5)
    u16 unk_0_E:2;           // 2 bits: Unknown/Unused
};
```

Because bitfields in C (when compiled for GBA/ARM) are packed sequentially into the 16-bit integer (little-endian), the actual bit layout is:
- **Bits 0-1:** `pickState`
- **Bits 2-13:** `flavorTextFlags`
- **Bits 14-15:** `unk_0_E`

To extract the `flavorTextFlags` correctly from the 16-bit integer, you should shift right by 2 and then bitwise AND with `0xFFF`:
```javascript
const flavorTextFlags = (fameCheckerRawValue >> 2) & 0xFFF;
```

## Notable NPCs Indices
The 16-element array maps each index to a specific person. The indices for notable non-Gym Leader NPCs are:

- `0`: Prof. Oak
- `1`: Daisy
- `13`: Bill
- `14`: Mr. Fuji

*(Indices 2 through 12, and 15 map to Gym Leaders and Elite Four members, which are covered in a separate document.)*

## Implementation Details for Parsing
When parsing the `SaveBlock1` data using `DataView`, read a 16-bit unsigned integer (`getUint16(..., true)` for little-endian) at `0x3A54 + (index * 2)`.

Example for extracting Daisy's flavor texts:
1. Locate `SaveBlock1`.
2. Offset for Daisy is `0x3A54 + (1 * 2) = 0x3A56`.
3. Read the 16-bit integer at `0x3A56`.
4. Extract `flavorTextFlags` by doing `(val >> 2) & 0xFFF`. Each of the lower 6 bits (0-5) of this resulting value indicates whether a specific flavor text entry is unlocked.
