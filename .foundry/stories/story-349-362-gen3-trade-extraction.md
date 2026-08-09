---
id: story-349-362-gen3-trade-extraction
type: STORY
title: Gen 3 NPC Trade Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-06'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '2959356290281764463'
pr_number: null
parent: epic-056-349-in-game-trade-data-extraction-v2
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story: Gen 3 NPC Trade Extraction

## Objective
Implement extraction of in-game NPC trade completion flags from Generation 3 (RSE, FRLG) save files.

## Acceptance Criteria
- [ ] Gen 3 NPC trade flags are identified and extracted for all core versions.
- [ ] The `npcTradeFlags` field in `SaveData` is consistently populated.
- [ ] Parsing logic strictly adheres to the `DataView` API and handles `RangeError` for corrupted saves.
- [x] Tech Lead: Break down this Story into executable Tasks.
- [ ] task-362-407-gen3-trade-extraction-impl
- [ ] task-362-408-gen3-trade-extraction-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
