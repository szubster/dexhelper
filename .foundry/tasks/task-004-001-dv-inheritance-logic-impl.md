---
id: task-004-001-dv-inheritance-logic-impl
type: TASK
title: Gen 2 DV Inheritance Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '8774648169264453623'
pr_number: null
parent: story-309-004-shiny-odds-computation
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 DV Inheritance Logic

## Description
Implement the Gen 2 DV inheritance logic in the `src/engine/breeding` module.

When breeding in Generation 2, DVs (specifically Defense and Special) are inherited from the opposite-gender parent, or the non-Ditto parent when breeding with a Ditto. The remaining DVs (Attack and Speed) are generated randomly.
This task should focus solely on writing a function that determines which parent's DVs are passed down to the offspring given the two parent Pokémon.

The function should take the two parents, evaluate their genders/egg groups to determine the source of inherited DVs, and return the DVs that the offspring will inherit.

## Acceptance Criteria
- [x] Implement a function to determine the inherited DVs for Gen 2 breeding in a file under `src/engine/breeding`.
- [x] Add unit tests covering various combinations (e.g., Male/Female, Ditto/Male, Ditto/Female, Ditto/Genderless).
