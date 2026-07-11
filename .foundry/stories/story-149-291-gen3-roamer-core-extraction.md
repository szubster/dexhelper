---
id: story-149-291-gen3-roamer-core-extraction
type: STORY
title: Gen 3 Roamer Core Structure Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-08'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '12031423049331882242'
pr_number: null
parent: epic-044-149-gen3-roamer-core-extraction-v4
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Core Structure Extraction

## Objective
Implement base DataView parsing for the Gen 3 Roamer structure in SaveBlock1.

## Description
Develop the core parsing logic to extract the Roamer data block (IVs, Species, HP, etc.) from SaveBlock1. This must handle the version-specific offsets for Ruby/Sapphire, Emerald, and FireRed/LeafGreen.

## Acceptance Criteria
- [ ] Implement `parseGen3Roamer` function in `src/engine/saveParser/parsers/gen3.ts`.
- [ ] Support Ruby/Sapphire and Emerald offsets as documented in research.
- [ ] Tech Lead: Break down this Story into executable Tasks.
