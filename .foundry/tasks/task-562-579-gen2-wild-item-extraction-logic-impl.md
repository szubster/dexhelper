---
id: task-562-579-gen2-wild-item-extraction-logic-impl
type: TASK
title: Implement Gen 2 Wild Encounter and Held Item Extraction Logic
status: ACTIVE
owner_persona: coder
created_at: '${DATE}'
updated_at: '2026-09-19'
depends_on:
  - task-562-578-gen2-wild-item-models-impl
jules_session_id: '12302990435372996256'
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement Gen 2 Wild Encounter and Held Item Extraction Logic

## Context
With the data models defined, this task involves writing the actual extraction logic for Gen 2 games (Gold, Silver, Crystal).

## Requirements
- Parse Gen 2 wild encounter locations and rates from the game's internal data structures.
- Map held item data and respective drop rates for Gen 2 Pokémon.
- Ensure module-level constants are used for all memory offsets, lengths, bit locations, etc. No magic numbers allowed.
- Handle `RangeError` for out-of-bounds reads during DataView operations.

## Acceptance Criteria
- [ ] Implement extraction logic for Gen 2 wild encounters.
- [ ] Implement mapping for Gen 2 held item drop rates.
