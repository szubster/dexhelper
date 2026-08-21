# Gen 3 Player Location Offsets

In Gen 3 save files, the player's current location and coordinates are stored in the SaveBlock1 block structure, specifically within the `WarpData` struct named `location`.

The `WarpData` struct has the following structure and takes up 8 bytes (including padding if any, although x/y are s16):
```c
struct WarpData
{
    s8 mapGroup;
    s8 mapNum;
    s8 warpId;
    // u8 padding (in some implementations) or implicit padding
    s16 x;
    s16 y;
};
```
However, in all three games (Ruby/Sapphire, Emerald, FireRed/LeafGreen), the `location` data within `SaveBlock1` is located at offset `0x04`.

## SaveBlock1 General Structure Context
- `0x00`: `struct Coords16 pos;` (Current coordinates: `s16 x, y;`) - 4 bytes
- `0x04`: `struct WarpData location;` - 8 bytes

Therefore:
- `mapGroup` is at offset `0x04`
- `mapNum` is at offset `0x05`
- `warpId` is at offset `0x06`
- `x` coordinate is at offset `0x08` (due to padding/alignment of s16)
- `y` coordinate is at offset `0x0A`

### Notes on Padding
The `WarpData` struct is defined with `s8 mapGroup; s8 mapNum; s8 warpId;` followed by `s16 x, y;`. Because `x` and `y` are 16-bit integers, they are typically 2-byte aligned, leaving a 1-byte padding after `warpId`. This means the `location.x` offset is `0x04 + 4 = 0x08`.

## Memory Offsets

| Property | Type | Relative Offset (SaveBlock1) |
| :--- | :--- | :--- |
| `pos.x` | `s16` (signed 16-bit) | `0x00` |
| `pos.y` | `s16` (signed 16-bit) | `0x02` |
| `location.mapGroup` | `s8` (signed 8-bit) | `0x04` |
| `location.mapNum` | `s8` (signed 8-bit) | `0x05` |
| `location.warpId` | `s8` (signed 8-bit) | `0x06` |
| `location.x` | `s16` (signed 16-bit) | `0x08` |
| `location.y` | `s16` (signed 16-bit) | `0x0A` |

*Note: Relative offset from the start of `SaveBlock1`.*

## Integration with Map Data
The `mapGroup` and `mapNum` combination can be used to construct the `Map ID` as described in `gen3_map_parsing.md`:
```
Map ID = (mapGroup << 8) | mapNum
```
This ID maps to the `id` constant for maps, which points to the localized name through `region_map_section`.
