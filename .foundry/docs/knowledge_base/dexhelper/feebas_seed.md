# Feebas Seed and Mechanics in Gen 3 Save Files

## Save File Structure & Location
In Pokémon Gen 3 (Ruby, Sapphire, Emerald), the save file is divided into 14 sections (each 4KB). Section 1 contains `SaveBlock1` at the beginning (offset 0x0 of the section data).

The Feebas seed is derived from the "Dewford Trend", which is the trendy phrase currently popular in Dewford Town. It dictates the 6 water tiles on Route 119 where Feebas can be fished.

## Feebas Seed Offset
The seed is a `u16` (2 bytes) and is stored differently in Emerald compared to Ruby/Sapphire.

### Emerald
- The `dewfordTrends` array of length 5 is stored at offset `0x2e64` inside `SaveBlock1`.
- The array elements are of type `struct DewfordTrend` (size `0x8` bytes).
- The seed used for Feebas is the `rand` field of the active trend (index 0).
- `rand` is at offset `0x2` inside the `struct DewfordTrend`.
- **Final Seed Offset:** `0x2e64 + 0x2 = 0x2e66` (in `SaveBlock1`)

### Ruby / Sapphire
- The `easyChatPairs` array of length 5 is stored at offset `0x2DD4` inside `SaveBlock1` (this array acts as the Dewford Trends array in R/S).
- The array elements are of type `struct EasyChatPair` (size `0x8` bytes).
- The seed used for Feebas is the `unk2` field of the active trend (index 0).
- `unk2` is at offset `0x2` inside the `struct EasyChatPair`.
- **Final Seed Offset:** `0x2DD4 + 0x2 = 0x2DD6` (in `SaveBlock1`)

## Route 119 Feebas Spot Calculation (PRNG Algorithm)

To translate this 16-bit seed into the 6 specific tile IDs on Route 119, the game uses its LCG (Linear Congruential Generator).

1. **Initialization:**
   The PRNG state (`sFeebasRngValue`) is initialized with the seed:
   ```c
   sFeebasRngValue = seed;
   ```

2. **Advancing the PRNG:**
   To get the next random number, the game advances the PRNG using the standard Gen 3 LCG formula:
   ```c
   sFeebasRngValue = 1103515245 * sFeebasRngValue + 12345;
   ```
   *Note: In R/S it's written as `12345 + 0x41C64E6D * sFeebasRngValue`, which is exactly the same math.*

3. **Spot Selection:**
   To pick a spot, the PRNG is advanced, and the top 16 bits of the state are modulo'd by the total number of fishing spots (`NUM_FISHING_SPOTS = 447` for Route 119):
   ```c
   spot = (sFeebasRngValue >> 16) % 447;
   ```

4. **Edge Cases & Spot Rejection:**
   - If the modulo result is `0`, the spot is forcibly changed to `447`.
   - If the resulting spot is less than `4` (i.e., `1`, `2`, or `3`), the spot is physically inaccessible on the map due to blocking terrain (waterfalls or non-surfable edges). The game **rejects** this spot and immediately tries again by advancing the PRNG and doing another modulo, without incrementing the loop counter for the 6 spots.

5. **Looping:**
   The game repeats steps 2-4 until it successfully selects `6` valid spots (the `NUM_FEEBAS_SPOTS`). The result is an array of 6 integer IDs. Each ID maps directly to a valid surfable water tile on Route 119, counting row-by-row, top-to-bottom, left-to-right.
