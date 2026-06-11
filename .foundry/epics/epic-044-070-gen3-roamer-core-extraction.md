---
id: epic-044-070-gen3-roamer-core-extraction
type: EPIC
title: Gen 3 Roamer Core Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '5698034449009749877'
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Core Extraction

## Objective
Extract the hidden roamer data structure directly from the `.sav` file for Gen 3 games (Ruby/Sapphire/Emerald and FireRed/LeafGreen) using the native `DataView` API.

## Description
Based on the research, the roamer data structure contains critical information such as IVs, Personality Value, HP, Level, and Status Condition. This Epic focuses on safely reading this 20-byte structure from the correct save offset and parsing it into a usable format for downstream logic.

## Acceptance Criteria
- [ ] Implement robust `DataView` parsing logic to extract the roamer data structure.
- [ ] Correctly parse IVs, HP, Level, and Status Condition from the raw bytes.
- [x] Story Owner: Break down this Epic into executable Stories.
- [ ] .foundry/stories/story-070-108-gen3-roamer-dataview-extraction.md
- [ ] .foundry/stories/story-070-109-gen3-roamer-status-parsing.md
