---
id: task-004-003-shiny-odds-calculation-impl
type: TASK
title: Gen 2 Shiny Odds Calculation
status: READY
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-20'
depends_on:
  - task-004-001-dv-inheritance-logic-impl
jules_session_id: null
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

# Gen 2 Shiny Odds Calculation

## Description
Implement the Gen 2 breeding shiny odds calculation using the DV inheritance logic.

If the inherited Defense DV is 10 and Special DV is 10, the offspring has a 1/64 chance of being shiny because the remaining DVs (Attack and Speed) are generated randomly in a way that provides a 1/64 probability of hitting the correct shiny combinations. Otherwise, the shiny odds are 1/8192.

Your implementation should use the DV inheritance function to determine the exact shiny odds fraction (e.g. 1/64 or 1/8192) of an offspring from a given pair of parent Pokémon.

## Acceptance Criteria
- [ ] Implement the Gen 2 shiny odds statistical calculation logic.
- [ ] Add unit tests verifying the calculation correctly returns 1/64 for shiny carriers and 1/8192 for non-carriers.
