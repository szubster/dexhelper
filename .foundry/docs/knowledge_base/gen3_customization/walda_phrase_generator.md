# Gen 3 Walda Phrase Generator Algorithm

## Overview
In Pokémon Emerald, the player can unlock custom PC Box wallpapers by giving a specific 15-character phrase to the father of a sick girl named Walda in Rustboro City. The phrase encodes the wallpaper's background color, foreground color, icon ID, and pattern ID, and it is validated against the player's Trainer ID.

## Algorithm Details

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
The table in order is:
```c
static const u8 sWaldaLettersTable[1 << 5] =
{
    CHAR_B, CHAR_C, CHAR_D, CHAR_F, CHAR_G, CHAR_H, CHAR_J, CHAR_K, CHAR_L, CHAR_M, CHAR_N, CHAR_P, CHAR_Q, CHAR_R, CHAR_S, CHAR_T, CHAR_V, CHAR_W, CHAR_Z,
    CHAR_b, CHAR_c, CHAR_d, CHAR_f, CHAR_g, CHAR_h, CHAR_j, CHAR_k,         CHAR_m, CHAR_n, CHAR_p, CHAR_q,         CHAR_s
};
```
*Note that these are internal Gen 3 encoding characters, not raw ASCII.*

### Data Population
1. The 15-character phrase provides 75 bits (15 * 5 bits).
2. The `data` array requires 72 bits (9 bytes).
3. The 75 bits from the phrase are mapped into the `data` array in a complex bit-shuffling process.
4. The last 3 bits of the phrase must match the first 3 bits of the `data` array for the phrase to be valid.

### Transformations
After the 72 bits are populated, three transformations occur:
1. `RotateWallpaperDataLeft(data, 9, 21)`: The entire 9-byte array is rotated left by 21 bits.
2. `RotateWallpaperDataLeft(data, 8, KEY & 0xF)`: The first 8 bytes are rotated left by the lower 4 bits of the `KEY` (data[8]).
3. `MaskWallpaperData(data, 8, KEY >> 4)`: The first 8 bytes are XORed with a mask derived from the upper 4 bits of the `KEY` (`mask | (mask << 4)`).

### Trainer ID Validation
The final unpacked data is validated against the player's Trainer ID (`trainerId`).
*   `TID_CHECK_HI` must equal `(BG_COLOR_LO ^ FG_COLOR_LO ^ ICON_ID ^ (trainerId >> 8))`
*   `TID_CHECK_LO` must equal `(BG_COLOR_HI ^ FG_COLOR_HI ^ PATTERN_ID ^ (trainerId & 0xFF))`

If these conditions are met, the wallpaper is considered valid, and the colors, icon, and pattern are unlocked.

## Reverse Engineering (Generator)
To generate a valid phrase for a given Trainer ID, Wallpaper Colors, Icon ID, and Pattern ID, one must reverse this algorithm:
1. Choose a valid `KEY` byte (0-255).
2. Calculate the required `TID_CHECK_HI` and `TID_CHECK_LO` using the desired parameters and the Trainer ID.
3. Construct the 9-byte `data` array in its final state.
4. Reverse the transformations (Mask, Rotate Right by `KEY & 0xF`, Rotate Right by 21).
5. Extract the 75 bits from the reversed `data` array, ensuring the first 3 bits match the last 3 bits.
6. Map the 5-bit chunks back to the 32-character `sWaldaLettersTable`.
