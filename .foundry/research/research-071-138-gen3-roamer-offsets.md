---
id: research-071-138-gen3-roamer-offsets
type: RESEARCH
title: Investigate Gen 3 Roamer Save Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '12140565963038921871'
pr_number: null
parent: idea-071-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - save-offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Save Offsets

We need to extract the hidden data structure of the currently active roaming Pokémon directly from the `.sav` file for Gen 3 games (Ruby/Sapphire/Emerald and FireRed/LeafGreen) to track Nature, IVs, HP, status condition, and location index.

## Acceptance Criteria
- [x] Find and document the save offsets for the roamer data structure across different Gen 3 versions.
- [x] Document the data structure format (how IVs, Nature, HP, status, and location are stored).

## Findings

### Roamer Save Offsets

The roamer data is stored in `SaveBlock1`. The exact offset relative to the start of `SaveBlock1` depends on the game version:

- **Ruby / Sapphire:** `0x3144`
- **Emerald:** `0x31DC`
- **FireRed / LeafGreen:** `0x30D0`

### Data Structure Format

The hidden roamer data is stored in a 20-byte `struct Roamer` (note: Ruby/Sapphire includes an extra 8 bytes of padding making it 28 bytes total, but the active data fields are the identical first 20 bytes).

| Offset | Type   | Size | Description                                           |
| ------ | ------ | ---- | ----------------------------------------------------- |
| `0x00` | `u32`  | 4    | IVs (Bitfield: HP, Atk, Def, Spd, SpAtk, SpDef)       |
| `0x04` | `u32`  | 4    | Personality Value (Determines Nature, Gender, Shininess) |
| `0x08` | `u16`  | 2    | Species ID (e.g., Latias, Latios, Entei, etc.)        |
| `0x0A` | `u16`  | 2    | Current HP                                            |
| `0x0C` | `u8`   | 1    | Level                                                 |
| `0x0D` | `u8`   | 1    | Status Condition (Bitfield: SLP, PSN, BRN, FRZ, PRZ, TOX) |
| `0x0E` | `u8`   | 1    | Cool stat                                             |
| `0x0F` | `u8`   | 1    | Beauty stat                                           |
| `0x10` | `u8`   | 1    | Cute stat                                             |
| `0x11` | `u8`   | 1    | Smart stat                                            |
| `0x12` | `u8`   | 1    | Tough stat                                            |
| `0x13` | `bool8`| 1    | Active flag (True if roamer is currently roaming)     |

*Location Storage Note:* The roamer's current map group and map number are **not** stored within this struct. They are kept in separate variables loaded into EWRAM (`sRoamerLocation` or similar). However, determining its map based solely on the save file is difficult since the location shifts dynamically without saving unless the player saves in-game while the roamer is active. The player's current location (`SaveBlock1 -> location.mapGroup / mapNum`) and previous location history affect its movement logic upon step.
