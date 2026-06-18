---
id: story-070-108-gen3-roamer-dataview-extraction
type: STORY
title: Gen 3 Roamer DataView Extraction and Core Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: '1965819455782298823'
pr_number: null
parent: epic-044-070-gen3-roamer-core-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Extraction and Core Parsing

## Objective
Extract the 20-byte hidden roamer data structure from Gen 3 save files using `DataView` and parse IVs, HP, and Level.

## Description
This story handles the base extraction logic in the save parser for Gen 3. The `DataView` API must be used to safely read the 20-byte structure. Following extraction, logic should be implemented to correctly parse the IVs, HP, and Level of the roamer from this raw byte structure.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for the 20-byte Gen 3 roamer structure.
- [ ] Implement parsing logic for IVs, HP, and Level from the structure.
- [x] Tech Lead: Break down this Story into executable Tasks.

## Generated Tasks
- [ ] task-108-161-gen3-roamer-dataview-extraction-impl
- [ ] task-108-162-gen3-roamer-dataview-extraction-qa
- [ ] task-108-192-gen3-roamer-dataview-extraction-impl
- [ ] task-108-193-gen3-roamer-dataview-extraction-qa
- [ ] research-108-194-gen3-roamer-iv-bitfield
