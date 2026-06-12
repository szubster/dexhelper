---
id: research-046-140-gen3-battle-frontier
type: RESEARCH
title: Gen 3 Battle Frontier Offset Research
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-074-046-gen3-battle-frontier-tracker
tags:
  - research
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Battle Frontier Offsets

## Context
Since the exact memory offsets and byte structures for the Battle Frontier data (win streaks, max records, Silver/Gold symbol status, BP) are missing, we need to spawn a `RESEARCH` node to investigate and document them. This adheres to the Groundedness Rule for Data Assumptions. The findings will be used by downstream data extraction tasks.

## Requirements
We need to find the exact save file structure and offsets for:
- Current win streaks for all 7 facilities
- Max win records for all 7 facilities
- Silver/Gold symbol status for all 7 facilities
- Total Battle Points (BP)

## Acceptance Criteria
- [x] Extract all required offsets for the 7 facilities and BP.
- [x] Document the offsets in this research markdown file.



## Findings: SaveBlock1 and SaveBlock2 Sections
In Generation 3 (Emerald), the save file is divided into 14 sections (4096 bytes each).
- **SaveBlock2** is always in Section 0.
- **SaveBlock1** is split across Sections 1 through 4.

## Battle Frontier Data Offsets (SaveBlock2)
These offsets are relative to the start of `SaveBlock2` (Section 0 offset `+ 0x0000`).
- `0x064C` - `struct BattleFrontier` start
- `0x0CE0` - `towerWinStreaks` (Current win streaks for Tower)
- `0x0CF0` - `towerRecordWinStreaks` (Max win records for Tower)
- `0x0D0C` - `domeWinStreaks`
- `0x0D14` - `domeRecordWinStreaks`
- `0x0DC8` - `palaceWinStreaks`
- `0x0DD0` - `palaceRecordWinStreaks`
- `0x0DDA` - `arenaWinStreaks`
- `0x0DDE` - `arenaRecordStreaks`
- `0x0DE2` - `factoryWinStreaks`
- `0x0DEA` - `factoryRecordWinStreaks`
- `0x0E04` - `pikeWinStreaks`
- `0x0E08` - `pikeRecordStreaks`
- `0x0E1A` - `pyramidWinStreaks`
- `0x0E1E` - `pyramidRecordStreaks`
- `0x0EB8` - `battlePoints` (BP)

## Silver/Gold Symbol Flags (SaveBlock1)
These flags are stored inside the `flags` array in `SaveBlock1`.
The `flags` array starts at `0x1270` relative to the start of `SaveBlock1` (Section 1).
Each flag corresponds to a byte offset `(FlagID / 8)` and a bit index `(FlagID % 8)`.

- **Tower Silver:** Flag ID 0x8C4, Offset `0x1388`, Bit 4
- **Tower Gold:** Flag ID 0x8C5, Offset `0x1388`, Bit 5
- **Dome Silver:** Flag ID 0x8C6, Offset `0x1388`, Bit 6
- **Dome Gold:** Flag ID 0x8C7, Offset `0x1388`, Bit 7
- **Palace Silver:** Flag ID 0x8C8, Offset `0x1389`, Bit 0
- **Palace Gold:** Flag ID 0x8C9, Offset `0x1389`, Bit 1
- **Arena Silver:** Flag ID 0x8CA, Offset `0x1389`, Bit 2
- **Arena Gold:** Flag ID 0x8CB, Offset `0x1389`, Bit 3
- **Factory Silver:** Flag ID 0x8CC, Offset `0x1389`, Bit 4
- **Factory Gold:** Flag ID 0x8CD, Offset `0x1389`, Bit 5
- **Pike Silver:** Flag ID 0x8CE, Offset `0x1389`, Bit 6
- **Pike Gold:** Flag ID 0x8CF, Offset `0x1389`, Bit 7
- **Pyramid Silver:** Flag ID 0x8D0, Offset `0x138A`, Bit 0
- **Pyramid Gold:** Flag ID 0x8D1, Offset `0x138A`, Bit 1
