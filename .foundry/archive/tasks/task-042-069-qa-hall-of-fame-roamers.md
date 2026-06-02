---
id: task-042-069-qa-hall-of-fame-roamers
type: TASK
title: 'QA: Hall of Fame & Roamers Extraction'
status: COMPLETED
owner_persona: qa
created_at: '2026-05-06'
updated_at: '2026-05-10'
depends_on:
  - task-042-068-implement-hall-of-fame-roamers
jules_session_id: null
pr_number: null
parent: story-026-042-hall-of-fame-roamers
tags:
  - gen2
  - save-parser
  - roamers
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA: Hall of Fame & Roamers Extraction

## Context
Verify the implementation of Hall of Fame count and roaming legendary (Raikou, Entei, Suicune) map location extraction for Gen 2 save files.

## Technical Contract
- `SaveData` must include `roamingLegendaries` with `{ speciesId: number; level: number; mapGroup: number; mapId: number }[]`.
- `parseGen2` must correctly identify Hall of Fame counts and the locations for the roamers using the specified offsets (GS: 0x24EC, 0x28DA / Crystal: 0x24CE, 0x28B6).

## Acceptance Criteria
- [x] `SaveData` accurately represents the updated models.
- [x] Implementation parses the expected data.
- [x] Unit tests pass via `pnpm test` and properly mock both `GS` and `Crystal` offset behaviors.
