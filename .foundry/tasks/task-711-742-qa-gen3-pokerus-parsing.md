---
id: task-711-742-qa-gen3-pokerus-parsing
type: TASK
title: QA Gen 3 Pokerus Parsing and Mapping
status: READY
owner_persona: qa
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on:
  - task-711-740-gen3-pokerus-parsing-logic
  - task-711-741-gen3-pokerus-parsing-tests
jules_session_id: null
pr_number: null
parent: story-690-711-gen3-pokerus-parsing-and-mapping
tags:
  - gen3
  - pokerus
  - save-engine
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Gen 3 Pokerus Parsing and Mapping

## Objective
Verify the correctness of the Gen 3 Pokerus extraction and mapping logic and its corresponding tests.

## Scope
- Review the code in `src/engine/saveParser/parsers/gen3.ts` to ensure it correctly locates the first byte of the Miscellaneous (M) substructure.
- Verify that the bitwise operations (`>> 4` for strain, `& 0x0f` for days remaining) are accurately applied and mapped to the `SaveData` payload.
- Verify that the tests cover various scenarios (e.g., infected, cured, uninfected) for Gen 3 saves.
- Run the full test suite to verify no regressions were introduced.

## Acceptance Criteria
- [ ] QA: Verify implementation correctly locates the M substructure and extracts the Pokerus byte.
- [ ] QA: Verify tests adequately cover Gen 3 Pokerus parsing scenarios.
- [ ] QA: Execute `pnpm lint && pnpm test` and verify tests pass.
