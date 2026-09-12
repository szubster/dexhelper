---
id: research-473-564-investigate-wallpaper-generator-failure
type: RESEARCH
title: Investigate Gen 3 Wallpaper Phrase Generator Failure
status: READY
owner_persona: researcher
created_at: '2026-09-08'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
parent: story-335-473-gen3-wallpaper-phrase-generator
tags:
  - gen3
  - customization
  - algorithm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 3 Wallpaper Phrase Generator Failure

## Objective
Investigate the root cause for the permanent failure (max rejection count reached) of the `task-473-498-gen3-wallpaper-phrase-generator-impl` task, which attempted to implement the generation logic for custom PC box wallpaper unlock phrases based on a Generation 3 Trainer ID.

## Context
The task `task-473-498-gen3-wallpaper-phrase-generator-impl` was tasked with implementing the mathematical algorithm used by the game (involving specific character sets and bitwise operations on the TID) to generate the 16 specific phrases for custom PC Box wallpapers. The task reached a max rejection count. We need to gather the actual mathematical facts, constants, and offsets required to correctly implement this algorithm before re-attempting the implementation.

## Requirements
*   Research the exact algorithm used in Pokemon Emerald (Gen 3) to generate the PC Box wallpaper phrases from a Trainer ID.
*   Identify the exact character sets and bitwise operations required.
*   Document these findings clearly in this markdown file.

## Acceptance Criteria
- [x] Document the mathematical algorithm and character sets required for phrase generation.
## Findings

### Algorithm Overview
In Pokémon Emerald, the player can unlock custom PC Box wallpapers by giving a specific 15-character phrase to the father of a sick girl named Walda in Rustboro City. The phrase encodes the wallpaper's background color, foreground color, icon ID, and pattern ID, and it is validated against the player's Trainer ID.

The phrase is evaluated using a 9-byte (72-bit) `data` array:
*   `data[0]` = `BG_COLOR_LO`
*   `data[1]` = `BG_COLOR_HI`
*   `data[2]` = `FG_COLOR_LO`
*   `data[3]` = `FG_COLOR_HI`
*   `data[4]` = `ICON_ID`
*   `data[5]` = `PATTERN_ID`
*   `data[6]` = `TID_CHECK_HI`
*   `data[7]` = `TID_CHECK_LO`
*   `data[8]` = `KEY`

### Character Set
Only 32 specific characters are allowed in the phrase. Each allowed character corresponds to a 5-bit index (0-31). Vowels and certain consonants (X/x, Y/y, l, r, t, v, w, z) are excluded.
The table of allowed characters in Gen 3 internal encoding order is:
```c
static const u8 sWaldaLettersTable[1 << 5] =
{
    CHAR_B, CHAR_C, CHAR_D, CHAR_F, CHAR_G, CHAR_H, CHAR_J, CHAR_K, CHAR_L, CHAR_M, CHAR_N, CHAR_P, CHAR_Q, CHAR_R, CHAR_S, CHAR_T, CHAR_V, CHAR_W, CHAR_Z,
    CHAR_b, CHAR_c, CHAR_d, CHAR_f, CHAR_g, CHAR_h, CHAR_j, CHAR_k,         CHAR_m, CHAR_n, CHAR_p, CHAR_q,         CHAR_s
};
```
These map to specific byte values in the Gen 3 character encoding.

### Data Population and Transformations
1. The 15-character phrase provides 75 bits (15 characters * 5 bits).
2. The `data` array requires 72 bits (9 bytes).
3. The 75 bits from the phrase are mapped into the `data` array through a bit-shifting process where `data` bits are populated from the 5-bit characters.
4. The first 3 bits of the `data` array are checked against the last 3 bits of the phrase. They must match for the phrase to be valid.
5. Three transformations are applied to the `data` array:
   *   `RotateWallpaperDataLeft(data, 9, 21)`: The entire 9-byte array is rotated left by 21 bits.
   *   `RotateWallpaperDataLeft(data, 8, KEY & 0xF)`: The first 8 bytes are rotated left by the lower 4 bits of the `KEY` (data[8]).
   *   `MaskWallpaperData(data, 8, KEY >> 4)`: The first 8 bytes are XORed with a mask derived from the upper 4 bits of the `KEY` (`mask | (mask << 4)`).

### Trainer ID Validation
The final unpacked data is validated against the player's Trainer ID (`trainerId`).
*   `TID_CHECK_HI` must equal `(BG_COLOR_LO ^ FG_COLOR_LO ^ ICON_ID ^ (trainerId >> 8))`
*   `TID_CHECK_LO` must equal `(BG_COLOR_HI ^ FG_COLOR_HI ^ PATTERN_ID ^ (trainerId & 0xFF))`

If these conditions are met, the wallpaper is considered valid, and the colors, icon, and pattern are unlocked.

### Reversing the Algorithm
To generate a phrase:
1. Construct the final 9-byte `data` array using desired colors, icon, pattern, a chosen `KEY` (0-255), and the target `trainerId`.
2. Compute `TID_CHECK_HI` and `TID_CHECK_LO` according to the validation logic.
3. Reverse the transformations in order:
   *   XOR the first 8 bytes with `mask | (mask << 4)` where `mask = KEY >> 4`.
   *   Rotate the first 8 bytes right by `KEY & 0xF`.
   *   Rotate all 9 bytes right by 21 bits.
4. Extract 5-bit chunks from the 9-byte array to form 15 character indices (ensuring the 3-bit overlap check holds).
5. Map these indices to the `sWaldaLettersTable` to get the Gen 3 text characters.
