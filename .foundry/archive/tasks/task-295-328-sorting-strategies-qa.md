---
id: task-295-328-sorting-strategies-qa
type: TASK
title: QA - Standard PC Box Sorting Strategies
status: CANCELLED
owner_persona: qa
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on:
  - task-295-327-sorting-strategies-impl
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

# QA - Standard PC Box Sorting Strategies

## Objective
Verify the implementation of the concrete sorting strategies for PC Boxes.

## Acceptance Criteria
- [ ] Verify `DexNumberSorter` correctly sorts by National and Regional Pokedex numbers.
- [ ] Verify `LevelSorter` correctly sorts in both ascending and descending order.
- [ ] Verify `TypeSorter` correctly sorts alphabetically by primary type, then secondary type.
- [ ] Verify `AlphaSorter` correctly sorts alphabetically by nickname (if present) or species name.
- [ ] Verify all strategies gracefully handle missing `metadata` (e.g., sorting items with missing metadata to the end).
- [ ] Verify `StandardStrategies.test.ts` exists and passes.

## Technical Contract
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
