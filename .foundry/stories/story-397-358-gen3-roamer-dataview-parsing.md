---
id: story-397-358-gen3-roamer-dataview-parsing
type: STORY
title: Gen 3 Roamer DataView Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-05'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '9758010313738458954'
pr_number: null
parent: epic-044-397-gen3-roamer-core-extraction-v5
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Parsing

## Objective
Implement robust DataView parsing to extract the core data structure of the roaming legendary from Gen 3 save files across Ruby/Sapphire, Emerald, FireRed/LeafGreen.

## Acceptance Criteria
- [x] Implement `DataView` parsing for the Gen 3 `Roamer` struct (SaveBlock1) for Ruby/Sapphire, Emerald, FireRed/LeafGreen.
- [x] Extract IVs, Personality Value, Species, HP, Level, Status.
- [x] Extract and expose the `active` boolean to determine if the roamer is currently available in the game world.
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [x] task-358-402-gen3-roamer-model-and-struct-parser-impl
- [x] task-358-403-gen3-roamer-game-integrations-impl
- [x] task-358-404-gen3-roamer-parsing-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
