---
id: story-067-104-gen3-roamer-data-structure
type: STORY
title: Gen 3 Roamer Data Structure Standardization
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: '4511775550378085432'
pr_number: null
parent: epic-043-067-roamer-data-extraction
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Data Structure Standardization

## Objective
Review and standardize the `roamingLegendaries` interface in `src/engine/saveParser/parsers/common.ts` to ensure it can accommodate the data structures required for both Generation 2 and Generation 3 roamers.

## Description
Currently, Gen 2 provides `speciesId`, `level`, `mapGroup`, and `mapId` for its roamers. We must ensure this structure is adequate for Gen 3 (Latios/Latias), and document any generation-specific differences in the unified structure so the suggestion engine can properly route them.

## Acceptance Criteria
- [ ] Ensure `SaveData.roamingLegendaries` is robust for both generations.
- [ ] Document map group/id differences between Gen 2 and Gen 3 within the interface comments.
- [x] Break down this Story into executable Tasks.
- [ ] .foundry/tasks/task-104-159-gen3-roamer-interface-impl.md
- [ ] .foundry/tasks/task-104-159-gen3-roamer-interface-qa.md
