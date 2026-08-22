# Gen 3 Opponent Team and AI Data Structure

## Overview
In Generation 3 (RSE and FRLG), data about trainers, their AI scripts, and their teams are compiled into ROM as fixed structs. To extract or predict the AI behavior of upcoming trainers, we must parse the `Trainer` struct and the subsequent `TrainerMon` (party) struct arrays.

## Trainer Struct (`struct Trainer`)
The `Trainer` struct defines the global attributes for a trainer battle, including their AI logic flags and party structure. The total size of the struct is **40 bytes** (`0x28`).

### Memory Layout
| Offset | Field | Type | Description |
|---|---|---|---|
| `0x00` | `partyFlags` | `u8` | Bitfield defining party format. `0x01` = Custom Moves, `0x02` = Held Items. |
| `0x01` | `trainerClass` | `u8` | Trainer class ID (e.g. Gym Leader, Lass). |
| `0x02` | `encounterMusic_gender` | `u8` | Music and Gender flags. |
| `0x03` | `trainerPic` | `u8` | Trainer sprite ID. |
| `0x04` | `trainerName` | `u8[12]` | 12-byte string, unpadded. Ends at `0x10`. |
| `0x10` | `items` | `u16[4]` | 4 standard items the trainer can use. Ends at `0x18`. |
| `0x18` | `doubleBattle` | `bool8` | If `true`, this is a double battle. Includes 3 bytes of padding, ending at `0x1C`. |
| `0x1C` | `aiFlags` | `u32` | 32-bit bitfield of AI scripts to evaluate. Ends at `0x20`. |
| `0x20` | `partySize` | `u8` | Number of Pokémon in the party. Includes 3 bytes of padding, ending at `0x24`. |
| `0x24` | `party` | `u32` (ptr) | 32-bit ROM pointer to the array of `TrainerMon` structs. |

## AI Flags (`aiFlags`)
The `aiFlags` value (`0x1C`) dictates the behavior of the opponent in battle. Each bit represents a different AI script that will be evaluated sequentially.
Common flags:
- `1` (Bit 0): Check Bad Move (Do not use ineffective moves).
- `2` (Bit 1): Try to Faint (Use moves that will KO).
- `4` (Bit 2): Check Viability (General good battle logic).
- `8` (Bit 3): Setup first turn.
- `16` (Bit 4): Risky (Use risky moves).
- `32` (Bit 5): Prefer strongest move.
- `64` (Bit 6): Prefer Baton Pass.

## Opponent Party Data (`TrainerMon`)
The structure of the `TrainerMon` array depends entirely on the `partyFlags` (`0x00`) value in the `Trainer` struct. There are four possible variants.

### Variant 1: Default Moves, No Items (`partyFlags == 0x00`)
Size per mon: **6 bytes** (5 bytes + 1 padding).
| Offset | Field | Type |
|---|---|---|
| `0x00` | `iv` | `u16` | Fixed IV for all stats. |
| `0x02` | `lvl` | `u8` | Pokémon Level. |
| `0x03` | (Padding) | `u8` | Padding to align struct. |
| `0x04` | `species` | `u16` | Pokémon Species ID. |

### Variant 2: Custom Moves, No Items (`partyFlags == 0x01`)
Size per mon: **14 bytes** (13 bytes + 1 padding).
| Offset | Field | Type |
|---|---|---|
| `0x00` | `iv` | `u16` | Fixed IV for all stats. |
| `0x02` | `lvl` | `u8` | Pokémon Level. |
| `0x03` | (Padding) | `u8` | Padding to align struct. |
| `0x04` | `species` | `u16` | Pokémon Species ID. |
| `0x06` | `moves` | `u16[4]` | 4 specific move IDs. |

### Variant 3: Default Moves, With Items (`partyFlags == 0x02`)
Size per mon: **8 bytes**.
| Offset | Field | Type |
|---|---|---|
| `0x00` | `iv` | `u16` | Fixed IV for all stats. |
| `0x02` | `lvl` | `u8` | Pokémon Level. |
| `0x03` | (Padding) | `u8` | Padding to align struct. |
| `0x04` | `species` | `u16` | Pokémon Species ID. |
| `0x06` | `heldItem`| `u16` | Item held by the Pokémon. |

### Variant 4: Custom Moves, With Items (`partyFlags == 0x03`)
Size per mon: **16 bytes**.
| Offset | Field | Type |
|---|---|---|
| `0x00` | `iv` | `u16` | Fixed IV for all stats. |
| `0x02` | `lvl` | `u8` | Pokémon Level. |
| `0x03` | (Padding) | `u8` | Padding to align struct. |
| `0x04` | `species` | `u16` | Pokémon Species ID. |
| `0x06` | `heldItem`| `u16` | Item held by the Pokémon. |
| `0x08` | `moves` | `u16[4]` | 4 specific move IDs. |
