---
id: research-121-188-gen3-battle-frontier-win-streak-types
type: RESEARCH
title: Gen 3 Battle Frontier Win Streak Data Types
status: READY
owner_persona: researcher
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-121-171-gen3-parse-battle-frontier-win-streaks-impl
tags:
  - research
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Battle Frontier Win Streak Data Types

## Context
The previous offset research (`research-046-140-gen3-battle-frontier`) provided the memory offsets for the Battle Frontier win streaks but did not specify the exact data types, byte sizes, or if these are single integers or arrays.

## Requirements
Determine the exact data size (e.g. 16-bit vs 32-bit integer) and structure (single value or array) for each of the 7 Battle Frontier facility win streaks and records:
- `towerWinStreaks` / `towerRecordWinStreaks`
- `domeWinStreaks` / `domeRecordWinStreaks`
- `palaceWinStreaks` / `palaceRecordWinStreaks`
- `arenaWinStreaks` / `arenaRecordStreaks`
- `factoryWinStreaks` / `factoryRecordWinStreaks`
- `pikeWinStreaks` / `pikeRecordStreaks`
- `pyramidWinStreaks` / `pyramidRecordStreaks`

## Acceptance Criteria
- [x] Identify data types and byte sizes for all 7 facility win streaks and records.
- [x] Update this document with the exact structures.

## Findings: Battle Frontier Win Streak Data Types

Based on the `pret/pokeemerald` decompilation (specifically `include/global.h` and `include/constants/global.h`), the data types and array structures for the Battle Frontier facilities are as follows.

All elements are **16-bit unsigned integers (`u16`)**, meaning each value takes exactly **2 bytes**. The size of the arrays varies by facility because they track different battle modes (Singles, Doubles, Multi, Link Multi). The constant `FRONTIER_LVL_MODE_COUNT` is defined as `2` (representing Level 50 and Open Level).

*   **Battle Tower (`towerWinStreaks` / `towerRecordWinStreaks`)**:
    *   Type: 2D Array `u16 [4][2]` (4 battle modes, 2 level modes)
    *   Total size: 8 elements (16 bytes) each.
*   **Battle Dome (`domeWinStreaks` / `domeRecordWinStreaks`)**:
    *   Type: 2D Array `u16 [2][2]` (2 battle modes, 2 level modes)
    *   Total size: 4 elements (8 bytes) each.
*   **Battle Palace (`palaceWinStreaks` / `palaceRecordWinStreaks`)**:
    *   Type: 2D Array `u16 [2][2]` (2 battle modes, 2 level modes)
    *   Total size: 4 elements (8 bytes) each.
*   **Battle Arena (`arenaWinStreaks` / `arenaRecordStreaks`)**:
    *   Type: 1D Array `u16 [2]` (2 level modes)
    *   Total size: 2 elements (4 bytes) each.
*   **Battle Factory (`factoryWinStreaks` / `factoryRecordWinStreaks`)**:
    *   Type: 2D Array `u16 [2][2]` (2 battle modes, 2 level modes)
    *   Total size: 4 elements (8 bytes) each.
*   **Battle Pike (`pikeWinStreaks` / `pikeRecordStreaks`)**:
    *   Type: 1D Array `u16 [2]` (2 level modes)
    *   Total size: 2 elements (4 bytes) each.
*   **Battle Pyramid (`pyramidWinStreaks` / `pyramidRecordStreaks`)**:
    *   Type: 1D Array `u16 [2]` (2 level modes)
    *   Total size: 2 elements (4 bytes) each.
