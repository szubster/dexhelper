---
id: task-491-502-pal-park-item-constants-impl
type: TASK
title: Pal Park High Value Item Constants
status: READY
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-420-491-pal-park-item-identification
locks: []
tags:
  - feature
  - gen3
  - pal-park
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Pal Park High Value Item Constants

## Objective
Define constants for high-value items in the Pal Park engine.

## Context
Pal Park Migration Planner requires highlighting high-value held items (like Master Balls, rare berries, Leftovers) to ensure players know what is being migrated.

## Requirements
- Define constants for high-value items (`PAL_PARK_HIGH_VALUE_ITEMS`) in `src/engine/palPark/itemIdentification.ts`. These constants should be Gen 3 item IDs (refer to `PokeDB` or external references for Gen 3 item IDs). Example: Leftovers, Master Ball, various Berries.

## Acceptance Criteria
- [ ] Implement `PAL_PARK_HIGH_VALUE_ITEMS` constants array.
- [ ] Export the constants explicitly.
