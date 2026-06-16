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
- [ ] Identify data types and byte sizes for all 7 facility win streaks and records.
- [ ] Update this document with the exact structures.
