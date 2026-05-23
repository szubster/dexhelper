---
id: task-082-141-qa-shiny-carrier-logic
type: TASK
title: QA Gen 2 Shiny Carrier Logic
status: PENDING
owner_persona: qa
created_at: '2026-05-23'
updated_at: '2026-05-23'
depends_on:
  - .foundry/tasks/task-082-140-implement-shiny-carrier-logic.md
jules_session_id: null
pr_number: null
parent: story-044-082-dv-shiny-gene-logic
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Shiny Carrier Logic

## Objective
Verify the implementation of the `isShinyCarrier` utility and its integration into the Gen 1 and Gen 2 save parsers.

## Acceptance Criteria
- [ ] Verify `isShinyCarrier` function is exported from `src/engine/saveParser/parsers/common.ts` and correctly evaluates Defense DV of 10 and Special DV of 2 or 10.
- [ ] Verify `PokemonInstance` interface includes `isShinyCarrier?: boolean;`.
- [ ] Verify both `gen1.ts` and `gen2.ts` calculate and assign `isShinyCarrier` for each parsed Pokémon.
- [ ] Run test suite (`pnpm test`) to ensure unit tests pass.
