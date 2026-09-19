---
id: task-561-592-gen3-pokeblock-feeding-math
type: TASK
title: Implement Gen 3 Pokéblock Feeding Condition Math
status: PENDING
owner_persona: coder
created_at: '2026-09-18'
updated_at: '2026-09-18'
depends_on:
  - task-561-590-gen3-nature-modifiers-constants
  - task-561-591-gen3-pokeblock-blending-math
jules_session_id: null
pr_number: null
parent: story-540-561-gen3-pokeblock-math-formulas
priority: 50
tags:
  - dexhelper
  - gen3
  - contests
  - math
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Implement Gen 3 Pokéblock Feeding Condition Math

## Context
When a Pokémon is fed a Pokéblock, its contest condition stats increase based on the Pokéblock's flavors and the Pokémon's Nature.

## Requirements
- Implement a pure function that calculates condition stat gains based on a given Pokéblock and a target Pokémon's Nature.
- Apply Nature modifiers.
- Enforce the max feel cap (255) as mentioned in the epic.
- Write unit tests to verify condition stat calculations for various Natures and Pokéblock combinations.

## Acceptance Criteria
- [ ] Implement condition gain math functions.
- [ ] Write unit tests for feeding calculations and Nature modifiers.
