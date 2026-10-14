---
id: task-562-669-gen2-wild-item-extraction-logic-retry
type: TASK
title: Implement Gen 2 Wild Encounter and Held Item Extraction Logic (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-562-578-gen2-wild-item-models-impl
  - research-562-668-investigate-gen2-wild-encounter-extraction-failure
jules_session_id: null
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - typescript
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-562-668-investigate-gen2-wild-encounter-extraction-failure
notes: ''
locks: []
priority: 50
---

# Implement Gen 2 Wild Encounter and Held Item Extraction Logic (Retry)

## Context
With the data models defined and the failure investigation complete, this task involves writing the actual extraction logic for Gen 2 games (Gold, Silver, Crystal).

## Requirements
- Parse Gen 2 wild encounter locations and rates from the game's internal data structures.
- Map held item data and respective drop rates for Gen 2 Pokémon.
- Read `research-562-668-investigate-gen2-wild-encounter-extraction-failure` for the correct memory offsets and guidelines.
- Ensure module-level constants are used for all memory offsets, lengths, bit locations, etc. No magic numbers allowed.
- Handle `RangeError` for out-of-bounds reads during DataView operations.

## Acceptance Criteria
- [ ] Implement extraction logic for Gen 2 wild encounters based on the research provided.
- [ ] Implement mapping for Gen 2 held item drop rates based on the research provided.
