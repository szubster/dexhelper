# Gen 3 Contest Museum Paintings and Trainer Card Offsets

## Overview
In Generation 3 (Ruby, Sapphire, Emerald), one of the requirements to upgrade the Trainer Card (earning a star) is related to Pokémon Contests. Specifically, the player must win the Master Rank in all 5 contest categories (Cool, Beauty, Cute, Smart, Tough) with a high enough score to have a painting of their Pokémon displayed in the Lilycove Museum.

## Memory Implementation
The game **does not** scan the player's party or PC boxes for Contest Master ribbons to determine this requirement. Instead, it relies on an array of `ContestWinner` structures stored in `SaveBlock1`.

### The `contestWinners` Array
- **Location:** `SaveBlock1`
- **Offset (Emerald):** `0x2e90`
- **Total Elements (`NUM_CONTEST_WINNERS`):** `13`
- **Structure Size:** `32` bytes (`0x20`)

The first 8 elements are used for the Contest Hall paintings (which there are only 6 of, plus 2 unused slots). The final 5 elements are strictly for the Lilycove Museum paintings.

### `MUSEUM_CONTEST_WINNERS_START`
The Lilycove Museum paintings start at index 8 of the `contestWinners` array.
The constants used in `pokeemerald` are:
- `CONTEST_WINNER_MUSEUM_COOL`: `9`
- `CONTEST_WINNER_MUSEUM_BEAUTY`: `10`
- `CONTEST_WINNER_MUSEUM_CUTE`: `11`
- `CONTEST_WINNER_MUSEUM_SMART`: `12`
- `CONTEST_WINNER_MUSEUM_TOUGH`: `13`

The start index is defined as `MUSEUM_CONTEST_WINNERS_START = (CONTEST_WINNER_MUSEUM_COOL - 1) = 8`.

### `ContestWinner` Struct Definition
Each struct is 32 bytes (`0x20`):

| Offset | Type | Name | Description |
|---|---|---|---|
| `0x00` | `u32` | `personality` | The Personality Value (PV) of the winning Pokémon. |
| `0x04` | `u32` | `trainerId` | The Original Trainer (OT) ID. |
| `0x08` | `u16` | `species` | The internal species ID of the Pokémon. |
| `0x0A` | `u8` | `contestCategory` | The contest category ID. |
| `0x0B` | `u8[11]` | `monName` | The Pokémon's nickname (10 chars + terminator). |
| `0x16` | `u8[8]` | `trainerName` | The OT's name (7 chars + terminator). |
| `0x1E` | `u8` | `contestRank` | The rank of the contest. |
| `0x1F` | `u8` | `padding` | Structural padding. |

### Trainer Card Verification Logic
To verify if the player has all 5 museum paintings for the Trainer Card star, the game executes `CountPlayerMuseumPaintings()`. This function loops 5 times starting from index 8 (`MUSEUM_CONTEST_WINNERS_START`).

For each index, it checks if the `species` field (at offset `0x08` within the struct) is non-zero. If the `species` field is greater than `0`, the painting exists.

To parse this from the save file:
1. Locate `SaveBlock1` and navigate to the `contestWinners` array at `0x2e90` (for Emerald).
2. Start iterating from index `8` up to index `12` (inclusive).
3. The byte offset for the `species` field of the first museum painting is `0x2e90 + (8 * 32) + 8 = 0x2f98`.
4. If all 5 `species` fields (at `0x2f98`, `0x2fb8`, `0x2fd8`, `0x2ff8`, `0x3018`) are non-zero, the player has satisfied the Contest Master Rank criteria for the Trainer Card star.
