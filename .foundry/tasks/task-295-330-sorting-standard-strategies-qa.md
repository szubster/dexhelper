---
id: task-295-330-sorting-standard-strategies-qa
type: TASK
title: Verify Standard PC Box Sorting Strategies
status: PENDING
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - task-295-329-sorting-standard-strategies-impl
jules_session_id: null
pr_number: null
parent: story-136-295-sorting-standard-strategies
tags:
  - feature
  - sorting
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Verify Standard PC Box Sorting Strategies

## Objective
Verify the implementation of concrete sorting strategies (`DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) created in `task-295-329` against the base `SortingStrategy` interface.

## QA Validation Requirements

### Verification Steps

1.  **Code Review**:
    - Verify that `DexNumberSorter` supports both National and Regional variants.
    - Verify that `LevelSorter` supports both ascending and descending modes.
    - Verify that `TypeSorter` correctly sorts by primary type, and then by secondary type when primary types match.
    - Verify that `AlphaSorter` correctly sorts alphabetically, prioritizing nickname if available, else falling back to species name.

2.  **Testing**:
    - Ensure that the implementer wrote thorough unit tests for each strategy.
    - Run the unit tests (`pnpm test`) to confirm they all pass and no regressions were introduced.

3.  **Linting**:
    - Run `pnpm lint` to ensure the codebase remains clean and adheres to the project's formatting standards.

## REMINDER FOR QA
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Remember to append an entry to your journal `.foundry/journals/qa.md` documenting your validation outcomes and actions.

## Acceptance Criteria
- [ ] Verify `DexNumberSorter` functionality and tests.
- [ ] Verify `LevelSorter` functionality and tests.
- [ ] Verify `TypeSorter` functionality and tests.
- [ ] Verify `AlphaSorter` functionality and tests.
- [ ] Ensure all tests pass (`pnpm test`).
