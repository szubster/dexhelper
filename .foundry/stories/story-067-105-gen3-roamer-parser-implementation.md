---
id: story-067-105-gen3-roamer-parser-implementation
type: STORY
title: Gen 3 Roamer Save Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-25'
depends_on:
  - story-067-104-gen3-roamer-data-structure
jules_session_id: '12128947382382660552'
pr_number: null
parent: epic-043-067-roamer-data-extraction
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Save Parsing

## Objective
Implement binary parsing logic in `src/engine/saveParser/parsers/gen3.ts` to extract the Latios/Latias roaming data.

## Description
Identify the exact memory offsets for Latios/Latias in Ruby/Sapphire/Emerald save files. Update the parser to extract the `speciesId`, `level`, and `mapId`/`mapGroup` of the active roamer using the `DataView` API. Crucially, the parser must only consider a roamer as "active" if the corresponding event flag indicating it has been released is set in the save file.

## Acceptance Criteria
- [ ] Parser extracts Latios/Latias map group and ID.
- [ ] Parser extracts species ID and level.
- [ ] Parser verifies event flags before marking roamer as active.
- [x] Break down this Story into executable Tasks.
- [x] .foundry/research/research-105-196-gen3-roamer-event-flag.md
- [x] .foundry/tasks/task-105-197-gen3-roamer-parser-impl.md
- [x] .foundry/tasks/task-105-198-gen3-roamer-parser-qa.md
- [x] .foundry/research/research-105-210-gen3-roamer-alternative.md
- [ ] .foundry/tasks/task-105-214-gen3-roamer-parser-alternative-impl.md
- [ ] .foundry/tasks/task-105-215-gen3-roamer-parser-alternative-qa.md
