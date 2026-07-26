---
id: task-259-348-egg-move-breeding-rules-impl
type: TASK
title: Breeding Mechanics Integration for Pathfinding (Implementation)
status: PENDING
owner_persona: coder
created_at: '2026-07-26'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-113-259-egg-move-breeding-rules
tags:
  - feature
  - mechanics
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Breeding Mechanics Integration for Pathfinding (Implementation)

## Overview
Implement the breeding rules for the core pathfinding algorithm that calculates valid egg moves in `scripts/generate-pokedata.ts`. The algorithm should respect Gen 2 and Gen 3 breeding mechanics, specifically around Egg Groups and Gender Rates. Note that the Breadth-First Search (BFS) is already implemented in `scripts/generate-pokedata.ts`, you just need to refine the constraints of what constitutes a valid breeding edge.

## Acceptance Criteria
- [ ] Update `scripts/generate-pokedata.ts` to ensure the BFS algorithm respects Egg Group matching. If two Pokemon share an egg group (and neither is in the "No Eggs" group), they can breed.
- [ ] Update `scripts/generate-pokedata.ts` to ensure the algorithm respects gender requirements (opposite genders). One parent must be able to be male (gender_rate < 8 and !== -1) and the other female (gender_rate > 0 and !== -1), unless breeding with Ditto.
- [ ] Update `scripts/generate-pokedata.ts` to ensure invalid breeding pairs (e.g., both parents in the "No Eggs" group) are excluded.
- [ ] Verify `getEffectiveEggGroups` works as expected for this logic.
