---
id: task-563-586-thief-covet-engine-logic-core
type: TASK
title: Core Implementation for Thief/Covet Move Analysis Engine Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-09-17T00:08:29Z'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: '14847446025630620248'
pr_number: null
parent: story-553-563-thief-covet-engine-logic
tags:
  - dexhelper
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Core Implementation for Thief/Covet Move Analysis Engine Logic

## Context
As part of the Thief/Covet Team Optimizer epic, we need the core engine logic to scan through the player's saved state (both Party and PC Box Pokemon) and identify those that know item-stealing moves like "Thief" (Gen 2/3) or "Covet" (Gen 3).

## Requirements
- Create utility functions in the engine (e.g., `src/engine/moves/itemStealers.ts`) to traverse Party and PC Pokemon.
- Implement logic to check the movesets of these Pokemon for specific move IDs corresponding to Thief and Covet.
- Return a structured list or array of `PokeData` objects representing these optimal hunting Pokemon.

## Acceptance Criteria
- [x] coder: Implement traversal and filtering logic for Thief/Covet moves.
