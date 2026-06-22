# Gen 3 Battle Frontier Data Structures

This document outlines the memory offsets, structures, and behavior related to the Battle Frontier in Generation 3 save files (specifically Emerald), based on the `pret/pokeemerald` decompilation.

## 1. Battle Frontier Facilities

The Battle Frontier consists of 7 distinct facilities. In the data layer, they are represented by the following IDs (defined in `constants/battle_frontier.h`):

| ID | Facility Name |
|---|---|
| `0` | Battle Tower (`FRONTIER_FACILITY_TOWER`) |
| `1` | Battle Dome (`FRONTIER_FACILITY_DOME`) |
| `2` | Battle Palace (`FRONTIER_FACILITY_PALACE`) |
| `3` | Battle Arena (`FRONTIER_FACILITY_ARENA`) |
| `4` | Battle Factory (`FRONTIER_FACILITY_FACTORY`) |
| `5` | Battle Pike (`FRONTIER_FACILITY_PIKE`) |
| `6` | Battle Pyramid (`FRONTIER_FACILITY_PYRAMID`) |

## 2. BP (Battle Points) Wallet

The player's BP balance is stored as a 16-bit integer within the `BattleFrontier` structure in `SaveBlock2`.

- **`SaveBlock2` struct:** Starts at `0x0000`
- **`BattleFrontier` struct offset within `SaveBlock2`:** `0x064C`
- **`battlePoints` offset within `BattleFrontier` struct:** `0x0EB8`
- **Absolute offset within `SaveBlock2`:** `0x064C + 0x0EB8 = 0x1504`
- **Type:** `u16` (2 bytes, little-endian)

To extract the BP wallet balance: Seek to `0x1504` in the `SaveBlock2` buffer and read the `u16` value.

## 3. Frontier Brain Encounter Progress Metrics

Encountering a Frontier Brain depends on the current win streak for the specific facility.

### Win Streaks
Win streaks are tracked separately for each facility, battle mode (Singles, Doubles, etc.), and level mode (Level 50 or Open Level). Brain encounters **only happen in Singles** (`FRONTIER_MODE_SINGLES = 0`).

The `BattleFrontier` struct contains the win streaks at the following relative offsets:
- **Tower:** `towerWinStreaks[4][2]` at `0x0CE0`
- **Dome:** `domeWinStreaks[2][2]` at `0xD0C`
- **Palace:** `palaceWinStreaks[2][2]` at `0xDC8`
- **Arena:** `arenaWinStreaks[2]` at `0xDDA` (no battle mode, only singles)
- **Factory:** `factoryWinStreaks[2][2]` at `0xDE2`
- **Pike:** `pikeWinStreaks[2]` at `0xE04` (no battle mode, only singles)
- **Pyramid:** `pyramidWinStreaks[2]` at `0xE1A` (no battle mode, only singles)

*Note: For the multi-dimensional arrays, the index is `[battleMode][lvlMode]`. For brain tracking, we only care about `[0][lvlMode]` or just `[lvlMode]` for facilities that are singles-only.*

### Encounter Thresholds
The `sFrontierBrainStreakAppearances` table dictates when the brain will appear.

| Facility | Silver Streak Requirement | Gold Streak Requirement |
|---|---|---|
| Tower | 35 | 70 |
| Dome | 4 (Championships) | 9 (Championships) |
| Palace | 21 | 42 |
| Arena | 28 | 56 |
| Factory | 21 | 42 |
| Pike | 28 (Rooms) | 140 (Rooms) |
| Pyramid | 21 (Floors) | 70 (Floors) |

*The `winStreak` variable checked against these thresholds in `GetFrontierBrainStatus` is effectively the current streak plus the next challenge increment (usually `1`, except for Dome `0`). So a current streak of 34 + 1 = 35 triggers the Silver Tower Brain.*

### Symbols (Flags)
Whether the player has beaten the Frontier Brain is tracked via flags in `SaveBlock1` `flags` bitfield (`SYSTEM_FLAGS` starts at index `0x860`).

| Facility | Silver Symbol Flag | Gold Symbol Flag |
|---|---|---|
| Tower | `FLAG_SYS_TOWER_SILVER` (`0x8C4`) | `FLAG_SYS_TOWER_GOLD` (`0x8C5`) |
| Dome | `FLAG_SYS_DOME_SILVER` (`0x8C6`) | `FLAG_SYS_DOME_GOLD` (`0x8C7`) |
| Palace | `FLAG_SYS_PALACE_SILVER` (`0x8C8`) | `FLAG_SYS_PALACE_GOLD` (`0x8C9`) |
| Arena | `FLAG_SYS_ARENA_SILVER` (`0x8CA`) | `FLAG_SYS_ARENA_GOLD` (`0x8CB`) |
| Factory | `FLAG_SYS_FACTORY_SILVER` (`0x8CC`) | `FLAG_SYS_FACTORY_GOLD` (`0x8CD`) |
| Pike | `FLAG_SYS_PIKE_SILVER` (`0x8CE`) | `FLAG_SYS_PIKE_GOLD` (`0x8CF`) |
| Pyramid | `FLAG_SYS_PYRAMID_SILVER` (`0x8D0`) | `FLAG_SYS_PYRAMID_GOLD` (`0x8D1`) |

To display progress towards the *next* Frontier Brain encounter for a facility:
1. Check the Silver and Gold flags.
2. Read the corresponding `winStreak` for Singles.
3. Compare the streak against the next applicable threshold (Silver if 0 symbols, Gold if 1 symbol).
