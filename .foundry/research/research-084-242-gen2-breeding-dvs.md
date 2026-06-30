---
id: research-084-242-gen2-breeding-dvs
type: RESEARCH
title: Investigate Gen 2 Shiny / DV Overlap Breeding Constraints
status: READY
owner_persona: researcher
created_at: '2026-06-29'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - backend
  - breeding
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 2 Shiny / DV Overlap Breeding Constraints

## Context
The QA task `task-084-211-breeding-pair-algorithm-qa` was rejected with the reason "Merged with unfulfilled acceptance criteria". We know from system memory that in Gen 2, two Shiny (or Shiny Carrier) Pokémon cannot breed with each other due to overlapping DVs. We need to properly document these Gen 2 DV overlap breeding constraints to ensure the new implementation handles them correctly.

## Objectives
- Investigate and document the exact conditions where two Pokémon are considered "related" and therefore incompatible for breeding based on Gen 2 DVs.
- Provide the exact logic and test cases required to enforce this constraint in the breeding algorithm.
