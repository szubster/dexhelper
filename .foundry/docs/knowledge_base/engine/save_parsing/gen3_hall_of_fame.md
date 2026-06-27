# Gen 3 Hall of Fame Data Offsets

## 1. Global Offset and Structure Array
The Gen 3 save format utilizes a 4096-byte sector system. The Hall of Fame is stored across two specific sectors:
- Sector 28 (`SECTOR_ID_HOF_1`)
- Sector 29 (`SECTOR_ID_HOF_2`)

Each sector holds `3968` bytes of data (`SECTOR_DATA_SIZE`), leaving the remaining 128 bytes for sector footers (checksum, signature, ID).
When the game accesses the Hall of Fame, it concatenates the data portion of Sector 28 and Sector 29, creating a single contiguous `7936`-byte block.

## 2. Hall of Fame Data Structure

The `7936` bytes store an array of `HallofFameTeam` structs.
- **Maximum number of teams tracked:** `50` (`HALL_OF_FAME_MAX_TEAMS`)
- **Team Size:** `120` bytes
- **Total Array Size:** `6000` bytes (leaving `1936` bytes unused in the 2-sector block)

Each team consists of an array of 6 `HallofFameMon` structs (`PARTY_SIZE`).

### `HallofFameMon` Struct Definition (Total 20 bytes)
Due to 32-bit alignment and the size of variables, the `HallofFameMon` struct is exactly 20 bytes long with no padding needed.

| Offset | Type | Name | Size | Description |
|---|---|---|---|---|
| `0x00` | `u32` | `tid` | 4 bytes | The Original Trainer ID (OT ID). |
| `0x04` | `u32` | `personality` | 4 bytes | The Pokémon's Personality Value (PV). |
| `0x08` | `u16` (bitfield) | `species:9` | 9 bits | The Species ID (bits 0-8). Max value 511. |
| `0x09` | `u16` (bitfield) | `lvl:7` | 7 bits | The Level (bits 9-15). Max value 127. |
| `0x0A` | `u8[10]` | `nickname` | 10 bytes | The Pokémon's nickname, using the Gen 3 charset. |

*Note: In C, bitfields on `u16` are populated from lowest bit to highest. So `species` takes the lower 9 bits of the 16-bit word at `0x08`, and `lvl` takes the upper 7 bits (`lvl = (word >> 9) & 0x7F`).*

## 3. Version Differences
The structure and sizes are completely identical between Ruby, Sapphire, Emerald, FireRed, and LeafGreen. The `SECTOR_ID_HOF_1` and `SECTOR_ID_HOF_2` constants, the sector data size, the 50 team limit, and the 20-byte `HallofFameMon` struct remain exactly the same.

## 4. Hall of Fame Entry Count
The total number of times the player has entered the Hall of Fame is tracked globally as a Game Stat: `GAME_STAT_ENTERED_HOF`.
- This game stat has the ID `10`.
- It is located in the `gameStats` array in `SaveBlock1` (Offset `0x228C` in Emerald `SaveBlock1` for the array base, but the game stat ID logic will be handled dynamically or by parsing the stats array).
- This stat acts as the "page number" or "times entered" counter.
- While the stat can exceed 50 (up to 999), only the last 50 teams are kept in memory. The game uses a shift mechanism (moving `beforeTeam = afterTeam`) to drop the oldest team and append the new one at the end if the 50 limit is reached.
