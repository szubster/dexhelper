# Gen 2 Hall of Fame Count Offset

This document clarifies the offset for extracting the Hall of Fame count from Pokémon Gen 2 save files (Gold, Silver, Crystal).

## Problem with Standard Documentation
Standard documentation online often lists the Hall of Fame count at a fixed absolute offset (e.g., `0x24EC` for GS, `0x24CE` for Crystal). However, depending on emulator artifacts, regional versions, or initializations, these absolute offsets can be unreliable and have resulted in failed extractions and task rejections during implementation.

## Resolution
The correct and most reliable way to extract the Hall of Fame count is to use a relative offset based on a known anchor point within the player data block.

The Hall of Fame count is located **exactly `0xA8` (168) bytes after the Johto badges offset**.

### Implementation Strategy
1. Locate the Johto badges byte within the save file buffer.
2. Add `0xA8` to the Johto badges offset to find the exact byte representing the Hall of Fame count.
3. Read the single unsigned 8-bit integer at this calculated location.
