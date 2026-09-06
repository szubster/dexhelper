---
id: research-078-150-rs-battle-tower-data
type: RESEARCH
title: Ruby/Sapphire Battle Tower Data Investigation
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-03'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '7968889869267778353'
pr_number: null
parent: null
tags:
  - research
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Ruby/Sapphire Battle Tower Data Investigation

## Context
During the audit of `epic-046-078-gen3-battle-frontier-data-extraction`, it was observed that the Gen 3 save parser explicitly restricts Battle Frontier data extraction to Emerald saves only (`_forcedVersion === 'emerald'`). While the full Battle Frontier was introduced in Emerald, Pokémon Ruby and Sapphire do feature a Battle Tower.

It is currently unresolved whether Ruby and Sapphire save files contain a different structural representation for their Battle Tower win streaks and records, or if the data simply lives at different offsets compared to Emerald's `BattleFrontier` struct.

## Requirements
We need to investigate the Ruby/Sapphire save file structure to determine:
- Where (and if) Battle Tower win streaks and max win records are stored in Ruby/Sapphire.
- The precise byte offsets for these metrics within `SaveBlock1` or `SaveBlock2` for Ruby/Sapphire.
- Whether the logic developed for Emerald's Battle Tower can be adapted, or if a completely separate parser block is needed.

## Acceptance Criteria
- [x] Investigate the Ruby/Sapphire memory map for Battle Tower data.
- [x] Document the precise memory offsets and structures in this file.
- [x] Determine how to extract this data using `DataView` natively.

### Research Findings

After investigating the `pret/pokeruby` decompilation, I can confirm that Pokémon Ruby and Sapphire **do** store Battle Tower win streaks and records in `SaveBlock2`, but the structure and offsets are completely different from Emerald's `BattleFrontier` struct.

In Ruby and Sapphire:
- The Battle Tower data is stored in the `BattleTowerData` struct.
- This struct begins at offset `0x00A8` within `SaveBlock2` (`struct SaveBlock2` definition in `include/global.h`).
- The win streaks are divided into Level 50 (`levelType = 0`) and Level 100 (`levelType = 1`).

The key fields and their absolute offsets within `SaveBlock2` are:

| Field | Offset in `BattleTowerData` | Absolute Offset in `SaveBlock2` | Type |
|---|---|---|---|
| `recordWinStreaks[2]` | `0x04B8` | `0x0560` | `u16[2]` (4 bytes) |
| `totalBattleTowerWins` | `0x04C8` | `0x0570` | `u16` (2 bytes) |
| `bestBattleTowerWinStreak` | `0x04CA` | `0x0572` | `u16` (2 bytes) |
| `currentWinStreaks[2]` | `0x04CC` | `0x0574` | `u16[2]` (4 bytes) |

**Notes on Data Types:**
- `recordWinStreaks[0]` (Level 50): `SaveBlock2 + 0x0560` (`u16`)
- `recordWinStreaks[1]` (Level 100): `SaveBlock2 + 0x0562` (`u16`)
- `currentWinStreaks[0]` (Level 50): `SaveBlock2 + 0x0574` (`u16`)
- `currentWinStreaks[1]` (Level 100): `SaveBlock2 + 0x0576` (`u16`)

**Extraction using `DataView`:**
To extract this data, a new parser block specifically for Ruby/Sapphire is needed. The Emerald logic cannot be directly adapted because Emerald's `BattleFrontier` struct (at `0x064C` in `SaveBlock2`) handles all 7 facilities and tracks streaks by Battle Mode and Level Mode in multi-dimensional arrays, whereas Ruby/Sapphire only has the Battle Tower with Level 50 and Level 100 modes.

Example extraction logic for Ruby/Sapphire:
```typescript
const recordLv50 = view.getUint16(section2Offset + 0x0560, true);
const recordLv100 = view.getUint16(section2Offset + 0x0562, true);
const currentLv50 = view.getUint16(section2Offset + 0x0574, true);
const currentLv100 = view.getUint16(section2Offset + 0x0576, true);
```
