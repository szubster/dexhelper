# Gen 2 Room Decoration & Bank Savings Offsets

This document outlines the memory offsets in Generation 2 (Gold, Silver, Crystal) for Mom's bank account savings and the player's bedroom decorations.

## 1. Mom's Bank Savings

Mom's bank account savings and settings are stored within `SaveBlock1` (specifically the `wPlayerData` section).

**Memory Structure:**
*   **Mom's Savings (`wMomsMoney`):** A 3-byte (24-bit) little-endian integer representing the total pokedollars currently saved. Max value is `9,999,999` (`0x98967F`).
*   **Saving Money Status (`wMomSavingMoney`):** A 1-byte bitfield determining Mom's saving behavior.
    *   Bit 0: Saving some money
    *   Bit 1: Saving half money (unused)
    *   Bit 2: Saving all money (unused)
    *   Bit 7: Active (Mom is actively saving)

**Offsets (Relative to `johtoBadgesOffset`):**
To ensure safe parsing without relying on absolute static offsets, these values can be found relative to the Johto Badges byte (`0x23E4` in GS, `0x23E5` in Crystal).

*   **`wMomsMoney`**: `johtoBadgesOffset - 0x06` (6 bytes before Johto Badges)
*   **`wMomSavingMoney`**: `johtoBadgesOffset - 0x03` (3 bytes before Johto Badges)

## 2. Active Room Decorations

The player's currently active room decorations are stored sequentially as 1-byte IDs in the save file. Each byte represents the sprite ID of the decoration currently placed in that slot.

**Memory Structure (8 bytes total):**
*   `+0`: `wDecoBed` (e.g., Pink Bed, Polka Dot Bed)
*   `+1`: `wDecoCarpet` (e.g., Red Carpet, Green Carpet)
*   `+2`: `wDecoPlant` (e.g., Magna Plant, Tropic Plant)
*   `+3`: `wDecoPoster` (e.g., Clefairy Poster, Pikachu Poster)
*   `+4`: `wDecoConsole` (e.g., NES, SNES, N64)
*   `+5`: `wDecoLeftOrnament` (e.g., Pikachu Doll)
*   `+6`: `wDecoRightOrnament` (e.g., Jigglypuff Doll)
*   `+7`: `wDecoBigDoll` (e.g., Big Snorlax Doll)

**Offsets (Relative to `johtoBadgesOffset`):**
*   **Crystal (`wDecoBed`)**: `johtoBadgesOffset + 0x3B8` (952 bytes after Johto Badges)
*   **Gold/Silver (`wDecoBed`)**: `johtoBadgesOffset + 0x3DD` (989 bytes after Johto Badges)

*(Note: The exact distance changed between versions due to structural shifts in `wPlayerData`. When implementing the parser, you must check `isCrystal` to apply the correct relative shift).*

## 3. Unlocked Room Decorations (Event Flags)

The game tracks which decorations the player actually owns (unlocked) using standard **Event Flags**, not a dedicated array.

When the player inspects the PC to change decorations, the game dynamically iterates through these event flags to build a temporary list of owned items.

The event flags for decorations start at `EVENT_DECO_BED_1` (Flag ID: `676`) and end at `EVENT_DECO_BIG_LAPRAS_DOLL` (Flag ID: `721`).

**Memory Location:**
These flags exist within the `wEventFlags` block.
*   **Byte Offset within Event Flags Array**: `676 / 8 = 84` (`0x54`)
*   **Bit Position**: `676 % 8 = 4`

Therefore, to read the first unlocked decoration flag (`EVENT_DECO_BED_1`), the parser must look at **byte offset `0x54`, bit 4** of the `wEventFlags` array. The remaining decorations are stored in the subsequent bits and bytes.
The absolute offset to `wEventFlags` is already defined in the parsing engine (`EVENT_FLAGS_OFFSET_CRYSTAL = 0x2600` and `EVENT_FLAGS_OFFSET_GS = 0x2624`).
