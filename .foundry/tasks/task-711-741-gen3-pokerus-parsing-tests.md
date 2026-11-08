---
id: task-711-741-gen3-pokerus-parsing-tests
type: TASK
title: Gen 3 Pokerus Parsing and Mapping Tests
status: PENDING
owner_persona: coder
created_at: '2026-11-05'
updated_at: '2026-11-06'
depends_on:
  - task-711-740-gen3-pokerus-parsing-logic
jules_session_id: null
pr_number: null
parent: story-690-711-gen3-pokerus-parsing-and-mapping
tags:
  - gen3
  - pokerus
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Gen 3 Pokerus Parsing and Mapping Tests

## Objective
Write unit tests to verify the extraction and mapping logic for Pokerus data in Gen 3 Pokémon saves.

## Scope
- Write unit tests to verify accurate extraction of Pokerus strain and days remaining for Gen 3.
- Ensure the tests cover different combinations of `strain` and `days_remaining` states (e.g., infected, cured).
- Execute `pnpm lint && pnpm test` to ensure no regressions are introduced.

## Acceptance Criteria
- [ ] Coder: Write unit tests to verify accurate extraction of Pokerus strain and days remaining for Gen 3.
- [ ] Coder: Ensure `pnpm lint && pnpm test` passes without regressions.
