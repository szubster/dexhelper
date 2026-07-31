---
id: task-333-371-sorting-strategies-retry-qa
type: TASK
title: QA PC Box Sorting Strategies (Retry)
status: READY
owner_persona: qa
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on:
  - task-333-370-pokemon-types-data-retry-qa
  - task-333-365-sorting-strategies-impl
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

# Task: QA PC Box Sorting Strategies (Retry)

## Context
QA for the sorting strategies implementation in `task-333-365-sorting-strategies-impl`. This was cancelled due to its dependency failing, but now that the data pipeline will be fixed, we can re-verify the sorting logic.

## Acceptance Criteria
- [ ] Verify `DexNumberSorter`, `LevelSorter`, `TypeSorter`, and `AlphaSorter` correctly implement the `SortingStrategy` signature.
- [ ] Verify edge cases (e.g. missing data) are handled gracefully without throwing errors during sort.
- [ ] Run `pnpm test` to ensure all sorting unit tests pass and properly assert correct sorting orders.
- [ ] Verify `pnpm lint` passes.
