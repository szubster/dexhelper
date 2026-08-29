---
id: epic-340-420-pal-park-core-engine
type: EPIC
title: Pal Park Migration Core Engine
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '3814152722039716442'
pr_number: null
parent: prd-132-340-gen3-pal-park-migration-planner
tags:
  - feature
  - gen3
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Pal Park Migration Core Engine

## Objective
Implement the core logic and data structures for the Pal Park Migration Planner, handling Pokémon flagging, HM validation, item checks, and batch generation.

## Scope
- Implement logic to group flagged Gen 3 Pokémon into 6-slot batches.
- Implement HM validation to check flagged Pokémon's 4 move slots against the Gen 3 HM Move List.
- Identify held items (especially Master Balls, rare berries, Leftovers).
- Locate physical Box and Slot data for the flagged Pokémon.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into detailed STORY nodes.
- [ ] story-420-490-pal-park-hm-validation
- [ ] story-420-491-pal-park-item-identification
- [ ] story-420-492-pal-park-batch-generation
- [ ] story-420-493-pal-park-core-e2e
- [x] Orchestrator Safeguard: You MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.
