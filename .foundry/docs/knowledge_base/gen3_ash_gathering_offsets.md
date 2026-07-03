# Gen 3 Volcanic Ash Gather Count Memory Offsets

This document provides research findings regarding the exact memory offsets and data types within the Game Boy Advance Gen 3 save format (Ruby, Sapphire, Emerald) for the Volcanic Ash gather count, based on the `pret/pokeemerald` and `pret/pokeruby` decompilations.

## 1. Data Structure and Location

The Volcanic Ash count is stored as a game variable rather than a dedicated, named struct field.

-   **Variable Constant:** `VAR_ASH_GATHER_COUNT`
-   **Variable ID:** `0x4048`

Game variables starting from `0x4000` (`VARS_START`) are stored in the `vars` array within `SaveBlock1`.

-   **Variable Index Calculation:** `0x4048 - 0x4000 = 0x48` (72 in decimal)
-   **Data Type:** `u16` (2 bytes, little-endian)

Since each variable is a `u16`, the byte offset into the `vars` array is:
`72 * 2 = 144` (`0x90`)

## 2. Emerald Offsets

In Pokémon Emerald, the `vars` array is located at offset `0x139C` within `SaveBlock1`.

-   **`SaveBlock1` vars array base offset:** `0x139C`
-   **Byte Offset within vars array:** `0x90`
-   **Absolute Offset within `SaveBlock1`:** `0x139C + 0x90 = 0x142C`

## 3. Ruby / Sapphire Offsets

In Pokémon Ruby and Sapphire, the `vars` array is located slightly earlier at offset `0x1340` within `SaveBlock1`.

-   **`SaveBlock1` vars array base offset:** `0x1340`
-   **Byte Offset within vars array:** `0x90`
-   **Absolute Offset within `SaveBlock1`:** `0x1340 + 0x90 = 0x13D0`

## 4. Conclusion

To extract the total amount of Volcanic Ash gathered by the player:
1. Locate the active `SaveBlock1` memory block.
2. Based on the game version, seek to the corresponding absolute offset (`0x142C` for Emerald, `0x13D0` for Ruby/Sapphire).
3. Read the 16-bit unsigned integer (`u16`) using a `DataView`.

This count represents the exact number of steps taken in the ash-covered grass on Route 113 while carrying the Soot Sack.
