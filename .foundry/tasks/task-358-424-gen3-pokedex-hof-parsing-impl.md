---
id: task-358-424-gen3-pokedex-hof-parsing-impl
type: TASK
title: Task - Gen 3 Pokedex and Hall of Fame Parsing Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-14'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: '11953078704151884528'
pr_number: null
parent: story-400-358-gen3-trainer-card-parsing-core
tags:
  - feature
  - gen3
  - completionist
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Pokedex and Hall of Fame Parsing Implementation

## Description
Implement the core parsing logic to extract the Gen 3 Trainer Card upgrade criteria for the Pokedex and Hall of Fame. Add a `Gen3TrainerCard` interface with `hasHallOfFame`, `hasHoennDex`, and `hasNationalDex` boolean properties, and add `gen3TrainerCard` to `SaveData`. The logic should check for `hallOfFameCount > 0`, `hoennDexCount === 202`, and `nationalDexCount === 386`. Ensure strict adherence to the schema guidelines.

## Acceptance Criteria
- [x] Define `Gen3TrainerCard` in `src/engine/saveParser/parsers/common.ts` and add it to `SaveData`.
- [x] Construct and return `gen3TrainerCard` object within `parseGen3`.
- [x] Verify the implementation using appropriate unit tests.
