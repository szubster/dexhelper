---
id: task-333-383-sorting-strategies-core-qa
type: TASK
title: QA Core PC Box Sorting Strategies
status: PENDING
owner_persona: qa
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on:
  - task-333-382-sorting-strategies-core-impl
jules_session_id: null
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Core PC Box Sorting Strategies

## Context
The coder has implemented standard PC Box sorting strategies (Dex, Level, Type, Alpha).

## Acceptance Criteria
- [ ] Verify `DexNumberSorter`, `LevelSorter`, `TypeSorter`, and `AlphaSorter` correctly implement the `SortingStrategy` signature in `src/engine/sorting/StandardSorters.ts`.
- [ ] Verify edge cases (missing metadata, missing types, missing nicknames) are handled gracefully without throwing errors during sort.
- [ ] Run `pnpm test` to ensure all sorting unit tests pass and properly assert correct sorting orders.
- [ ] Verify `pnpm lint` passes.
