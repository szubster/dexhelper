---
id: story-072-108-gen3-roamer-location-extraction
type: STORY
title: Gen 3 Roamer Location Data Extraction
status: READY
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: '8499086342884173453'
pr_number: null
parent: epic-044-072-gen3-roamer-location-radar
tags:
  - gen3
  - roamer
  - map
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Location Data Extraction

## Objective
Extract the map group and map number for the roamer from the save file.

## Description
The Gen 3 roamer's active map group and map number are stored outside the primary 20-byte roamer struct (usually in `sRoamerLocation` or similar structure saved in EWRAM/save block depending on version). Implement the DataView parsing logic to extract these two values so we can track its position.

## Acceptance Criteria
- [ ] Research/determine the exact offset for the roamer's map group and map number.
- [ ] Implement the parsing logic using `DataView` to extract the location index from Gen 3 saves.
- [x] Tech Lead: Break down this Story into execution Tasks (implementation & QA).
- [x] .foundry/tasks/task-108-161-gen3-roamer-location-impl.md
- [x] .foundry/tasks/task-108-162-gen3-roamer-location-qa.md
- [ ] .foundry/research/research-108-206-gen3-roamer-ewram-investigation.md
- [ ] .foundry/tasks/task-108-207-gen3-roamer-alternative-impl.md
- [ ] .foundry/tasks/task-108-208-gen3-roamer-alternative-qa.md
