---
id: story-349-361-gen2-trade-extraction
type: STORY
title: Gen 2 NPC Trade Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-06'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: '8763873187215868612'
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
# Story: Gen 2 NPC Trade Extraction

## Objective
Implement extraction of in-game NPC trade completion flags from Generation 2 save files.

## Acceptance Criteria
- [ ] Gen 2 NPC trade flags are accurately extracted and mapped.
- [ ] Parsing logic strictly adheres to the `DataView` API and handles `RangeError` for corrupted saves.
- [x] Tech Lead: Break down this Story into executable Tasks.
- [ ] task-361-407-gen2-trade-extraction-impl
- [ ] task-361-408-gen2-trade-extraction-test
- [ ] task-361-409-gen2-trade-extraction-qa
