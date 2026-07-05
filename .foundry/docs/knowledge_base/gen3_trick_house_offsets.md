# Gen 3 Trick House Offsets

This document outlines the memory offsets and variables used to track the player's progression in the Trick House for Generation 3 games (Ruby, Sapphire, Emerald).

## Variable Offsets (SaveBlock1)

In the decompiled Gen 3 source (`pret/pokeemerald`), variables are stored in an array of `u16` called `vars` within `SaveBlock1`.

- `SaveBlock1` struct offset for `vars`: `0x139C`
- The `VARS_START` address is `0x4000`.
- To calculate the offset in `SaveBlock1` for a specific variable: `0x139C + ((VAR_ADDRESS - 0x4000) * 2)`

### Relevant Trick House Variables

The following variables track the progression through the Trick House puzzles. They should be defined as reusable constants for save file parsing.

```javascript
// Base offset for all variables in SaveBlock1
export const SAVE_BLOCK_1_VARS_OFFSET = 0x139C;

// Absolute offsets for Trick House variables within SaveBlock1
export const VAR_TRICK_HOUSE_LEVEL_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x4044 - 0x4000) * 2); // 0x1424
export const VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40A7 - 0x4000) * 2); // 0x14EA

// Puzzle states
export const VAR_TRICK_HOUSE_PUZZLE_1_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40AB - 0x4000) * 2); // 0x14F2
export const VAR_TRICK_HOUSE_PUZZLE_2_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40AC - 0x4000) * 2); // 0x14F4
export const VAR_TRICK_HOUSE_PUZZLE_3_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40AD - 0x4000) * 2); // 0x14F6
export const VAR_TRICK_HOUSE_PUZZLE_4_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40AE - 0x4000) * 2); // 0x14F8
export const VAR_TRICK_HOUSE_PUZZLE_5_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40AF - 0x4000) * 2); // 0x14FA
export const VAR_TRICK_HOUSE_PUZZLE_6_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40B0 - 0x4000) * 2); // 0x14FC
export const VAR_TRICK_HOUSE_PUZZLE_7_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40B1 - 0x4000) * 2); // 0x14FE
export const VAR_TRICK_HOUSE_PUZZLE_8_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40B2 - 0x4000) * 2); // 0x1500

export const VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40B5 - 0x4000) * 2); // 0x150A
export const VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + ((0x40C1 - 0x4000) * 2); // 0x1522
```

## Flags

Flags are stored in the `flags` array within `SaveBlock1` starting at `0x1270`.
The system flags start at `0x860`.

```javascript
// Base offset for all flags in SaveBlock1
export const SAVE_BLOCK_1_FLAGS_OFFSET = 0x1270;

// System Flags start at 0x860.
// FLAG_LANDMARK_TRICK_HOUSE = SYSTEM_FLAGS + 0x42 = 0x8A2
export const FLAG_LANDMARK_TRICK_HOUSE = 0x8A2;

// Offset of the byte containing the flag
export const FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET = SAVE_BLOCK_1_FLAGS_OFFSET + Math.floor(0x8A2 / 8); // 0x1270 + 0x114 = 0x1384
export const FLAG_LANDMARK_TRICK_HOUSE_BIT = 0x8A2 % 8; // 2
```

### Notes
- Each `var` is stored as an unsigned 16-bit integer (`u16`).
- When parsing the save file using the `DataView` API, use `getUint16(offset, true)` for variables since Game Boy Advance save data is little-endian.
- Flags are single bits within a byte array. Use bitwise operations to check them.
