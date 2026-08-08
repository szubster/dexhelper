---
id: task-358-403-gen3-roamer-game-integrations-impl
type: TASK
title: Gen 3 Roamer Game Integrations Implementation
status: READY
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on:
  - task-358-402-gen3-roamer-model-and-struct-parser-impl
jules_session_id: null
pr_number: null
parent: story-397-358-gen3-roamer-dataview-parsing
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Game Integrations Implementation

## Objective
Implement game-specific extractions by mapping the correct block offsets for Ruby/Sapphire, Emerald, and FireRed/LeafGreen, utilizing the generic parser.

## Context
Gen 3 games use A/B bank flash memory. Roamer data resides in SaveBlock1, but the relative offset within the block differs across game versions.

## Acceptance Criteria
- [ ] Determine correct relative offsets for the Roamer struct in SaveBlock1 for RS, Emerald, and FRLG.
- [ ] Implement game-specific extraction functions calling `parseGen3RoamerStruct`.
- [ ] Strictly adhere to `.foundry/docs/schema.md` Section 13 guidelines (use section offsets to calculate relative offsets, no absolute hardcoded offsets, no magic numbers, explicit module-level constants).
- [ ] Add integration unit tests verifying correct offset resolution and extraction for mock SaveBlock1 structures for all three game engine versions.