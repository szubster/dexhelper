---
id: task-121-171-gen3-parse-battle-frontier-win-streaks-impl
type: TASK
title: Implement Gen 3 Parse Battle Frontier Win Streaks
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-22'
depends_on: []jules_session_id: null
pr_number: null
parent: story-078-121-gen3-parse-battle-frontier-win-streaks
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Parse Battle Frontier Win Streaks

## Context
Based on the offset research in `research-046-140-gen3-battle-frontier`, extract the current and max win streaks for the 7 Battle Frontier facilities from SaveBlock2 using `DataView`.

**Note:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Requirements
Extract current win streaks and max win records for all 7 facilities (Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid) and implement error handling for out-of-bounds reads.

Offsets (relative to start of `SaveBlock2`, `0x0000`):
- `0x0CE0` - `towerWinStreaks`
- `0x0CF0` - `towerRecordWinStreaks`
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

## Acceptance Criteria
- [ ] Extract current win streaks for Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid.
- [ ] Extract max win records for all 7 facilities.
- [ ] Implement error handling for out-of-bounds reads.
