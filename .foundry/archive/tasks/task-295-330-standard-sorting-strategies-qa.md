---
id: task-295-330-standard-sorting-strategies-qa
type: TASK
title: QA Standard PC Box Sorting Strategies
status: CANCELLED
owner_persona: qa
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on:
  - task-295-329-standard-sorting-strategies-impl
jules_session_id: null
pr_number: null
parent: story-136-295-sorting-standard-strategies
tags:
  - feature
  - sorting
  - qa
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Task: QA Standard PC Box Sorting Strategies

## Objective
Verify the implementation of concrete sorting strategies (`DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) against the `SortingStrategy` interface.

## Context
These standard strategies allow users to sort their PC Boxes. Ensure they correctly handle various edge cases and function as expected when composed using `MultiCriterionSorter`.

## Acceptance Criteria
- [ ] Verify `DexNumberSorter` correctly sorts by National and Regional Pokedex numbers.
- [ ] Verify `LevelSorter` correctly sorts in both ascending and descending order.
- [ ] Verify `TypeSorter` correctly groups by primary type, and then by secondary type.
- [ ] Verify `AlphaSorter` correctly sorts alphabetically by nickname, and falls back to species name if no nickname exists.
- [ ] Ensure comprehensive test coverage exists for all implemented sorters.

## QA Reminders
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
