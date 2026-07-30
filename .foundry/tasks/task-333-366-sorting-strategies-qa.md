---
id: task-333-366-sorting-strategies-qa
type: TASK
title: QA PC Box Sorting Strategies
status: CANCELLED
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-07-30'
depends_on:
  - task-333-365-sorting-strategies-impl
jules_session_id: null
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-333-363-pokemon-types-data-impl
notes: ''
---

# Task: QA PC Box Sorting Strategies

## Context
The coder has implemented standard PC Box sorting strategies (Dex, Level, Type, Alpha).

## Acceptance Criteria
- [ ] Verify `DexNumberSorter`, `LevelSorter`, `TypeSorter`, and `AlphaSorter` correctly implement the `SortingStrategy` signature.
- [ ] Verify edge cases (missing metadata, missing types, missing nicknames) are handled gracefully without throwing errors during sort.
- [ ] Run `pnpm test` to ensure all sorting unit tests pass and properly assert correct sorting orders.
- [ ] Verify `pnpm lint` passes.
