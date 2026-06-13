# Gen 3 Berry Patch Memory Offsets and Structures

This document provides research findings regarding the exact memory offsets, block structures, and data offsets within the Game Boy Advance Gen 3 save format (Ruby, Sapphire, Emerald) for berry patches and Enigma Berry data, based on the `pret/pokeemerald` decompilation.

## 1. Berry Trees Array

The game manages a total of `128` Berry Trees. They are stored as a flat array within `SaveBlock1`.

- **Offset within SaveBlock1:** `0x169C`
- **Count:** `128` (constant `BERRY_TREES_COUNT`)
- **Total Array Size:** `1024` bytes (`0x400`)

### BerryTree Struct Definition

The `BerryTree` struct represents the state of a single berry patch. Due to 32-bit alignment padding on the Game Boy Advance, each struct is exactly **8 bytes** in size.

| Offset | Type | Name | Description |
|---|---|---|---|
| `0x00` | `u8` | `berry` | The ID of the berry planted in the patch. (0 if empty) |
| `0x01` | `u8` (Bitfield) | `stage:7`, `stopGrowth:1` | `stage` (bits 0-6): Growth stage of the berry.<br>`stopGrowth` (bit 7): Flag indicating growth is paused. |
| `0x02` | `u16` | `minutesUntilNextStage` | Real-time clock minutes remaining until the next growth stage. |
| `0x04` | `u8` | `berryYield` | The number of berries this tree will yield upon picking. |
| `0x05` | `u8` (Bitfield) | `regrowthCount:4`, `watered1:1`, `watered2:1`, `watered3:1`, `watered4:1` | `regrowthCount` (bits 0-3): Times it has regrown without being picked.<br>`wateredX` (bits 4-7): Tracks if the plant was watered at each stage. |
| `0x06` | Padding | (Padding) | 2 bytes of padding to align the struct to 4-byte boundaries. |

*Total Size: 8 bytes per BerryTree.*

## 2. Enigma Berry Data

Gen 3 introduced the Enigma Berry, which acts as a dynamic placeholder for e-Reader berries. Its data is also stored within `SaveBlock1`.

- **Offset within SaveBlock1:** `0x31F8`
- **Total Size:** `52` bytes

### EnigmaBerry Struct Definition

The `EnigmaBerry` struct is composed of a `Berry2` structure (which defines the custom berry's name, stats, and text), along with item effects, hold effects, and a checksum.

| Offset | Type | Name | Size |
|---|---|---|---|
| `0x00` | `struct Berry2` | `berry` | 28 bytes |
| `0x1C` | `u8[]` | `itemEffect` | 18 bytes (`BERRY_ITEM_EFFECT_COUNT`) |
| `0x2E` | `u8` | `holdEffect` | 1 byte |
| `0x2F` | `u8` | `holdEffectParam`| 1 byte |
| `0x30` | `u32` | `checksum` | 4 bytes |

#### `Berry2` Inner Struct Breakdown (28 bytes)
- `0x00`: `name` (`u8[7]`) - 6 characters + null terminator
- `0x07`: `firmness` (`u8`)
- `0x08`: `size` (`u16`)
- `0x0A`: `maxYield` (`u8`)
- `0x0B`: `minYield` (`u8`)
- `0x0C`: `description1` (`u32` pointer, generally ignored during save parsing as it points to ROM, but takes 4 bytes)
- `0x10`: `description2` (`u32` pointer)
- `0x14`: `stageDuration` (`u8`)
- `0x15`: `spicy` (`u8`)
- `0x16`: `dry` (`u8`)
- `0x17`: `sweet` (`u8`)
- `0x18`: `bitter` (`u8`)
- `0x19`: `sour` (`u8`)
- `0x1A`: `smoothness` (`u8`)
- `0x1B`: Padding (`u8`)

## Conclusion

The `DataView` parser in `task-095-157-gen3-berry-dataview-parsing` should seek to offset `0x169C` in `SaveBlock1` and iterate 128 times, advancing by 8 bytes per iteration.
Bitwise operations will be needed for offsets `0x01` and `0x05` to extract the correct growth stages, stop flags, regrowth counts, and watering history.
## 3. Implicit and Missing Data (Map ID, Time Planted, Last Watered)

During research, it was found that certain data points often assumed to exist are **not explicitly stored** in the Gen 3 save format.

- **Map ID:** The Map ID is not stored within the `BerryTree` struct. Instead, the 128 `BerryTree` slots are pre-allocated to specific locations in the game world. The mapping between the array index (the "Berry Tree ID") and its location is implicit. In the game's code, `constants/berry.h` defines constants like `BERRY_TREE_ROUTE_102_PECHA` which correspond to these array indices. In map data (`map.json`), these IDs are directly assigned to the `trainerRange_berryTreeId` field of `ObjectEvent` entities. Therefore, to determine a berry patch's map location, one must map the array index to its hardcoded map location.
- **Time Planted:** The exact time a berry was planted is not saved. The game instead uses the `lastBerryTreeUpdate` global timestamp (stored at offset `0xA0` in `SaveBlock2`) and calculates time differences to decrement the `minutesUntilNextStage` value.
- **Last Watered Time:** The time a berry was last watered is not recorded. The `BerryTree` struct only tracks boolean flags (`watered1`, `watered2`, `watered3`, `watered4`) for whether the plant was watered during each of its four growth stages.
