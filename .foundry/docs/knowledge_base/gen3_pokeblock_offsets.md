# Gen 3 Pokéblock Offsets and Structure

## SaveBlock1 Offsets
The Pokéblock array is located in `SaveBlock1` (Section 1).
- **Emerald:** Offset `0x0848`
- **Ruby / Sapphire:** Offset `0x07F8`
- **FireRed / LeafGreen:** Pokéblocks do not exist in these versions.

## Data Structure
The `Pokeblock` structure is exactly 8 bytes long. The maximum number of Pokéblocks (`POKEBLOCKS_COUNT`) is 40.
This results in a total size of `0x140` (320 bytes) for the Pokéblock array.

### Struct Fields
| Byte | Type | Field Name | Notes / Flavor Mapping |
|------|------|------------|------------------------|
| `0`  | `u8` | `color`    | See Color Enum below   |
| `1`  | `u8` | `spicy`    | Cool                   |
| `2`  | `u8` | `dry`      | Beauty                 |
| `3`  | `u8` | `sweet`    | Cute                   |
| `4`  | `u8` | `bitter`   | Smart                  |
| `5`  | `u8` | `sour`     | Tough                  |
| `6`  | `u8` | `feel`     | Smoothness             |
| `7`  | `u8` | `padding`  | Padding for alignment  |

### Color Enums
- `0`: None
- `1`: Red
- `2`: Blue
- `3`: Pink
- `4`: Green
- `5`: Yellow
- `6`: Purple
- `7`: Indigo
- `8`: Brown
- `9`: Lite Blue
- `10`: Olive
- `11`: Gray
- `12`: Black
- `13`: White
- `14`: Gold
