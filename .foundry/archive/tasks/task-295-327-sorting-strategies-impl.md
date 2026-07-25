---
id: task-295-327-sorting-strategies-impl
type: TASK
title: Implement Standard PC Box Sorting Strategies
status: CANCELLED
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-136-295-sorting-standard-strategies
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---
# Implement Standard PC Box Sorting Strategies

## Objective
Implement concrete sorting strategies using the base `SortingStrategy` interface defined in `story-136-294`. These standard strategies will allow users to sort their PC Boxes by common criteria such as Dex Number, Level, and Type.

## Context
Building upon the standard interface, we need specific, actionable sorters that understand the `SortablePokemon` structure. The functions will live in `src/engine/sorting/StandardStrategies.ts`.

## Acceptance Criteria
- [ ] Implement a `DexNumberSorter` strategy (supports both National and Regional variants). Should handle sorting by national Dex Number, and fallback to 9999 if not available. It can accept a boolean `national` argument to decide if National Dex Number or Regional Dex Number should be used.
- [ ] Implement a `LevelSorter` strategy (supports ascending/descending).
- [ ] Implement a `TypeSorter` strategy (sorts alphabetically by primary type, then secondary type).
- [ ] Implement an `AlphaSorter` strategy (alphabetical by nickname, falling back to species name).
- [ ] Create corresponding unit tests in `StandardStrategies.test.ts` to verify the accuracy of all sorters.

## Technical Contract
- **File Location:** `src/engine/sorting/StandardStrategies.ts`
- **Typing:** Sorters must conform to the `SortingStrategy` type `(a: SortablePokemon, b: SortablePokemon) => number`.
- **Higher-Order Functions:** Consider exporting factory functions that return the `SortingStrategy` (e.g., `createLevelSorter(ascending: boolean): SortingStrategy`).
- **Null Safety:** Metadata might be missing. Strategies relying on `metadata` (like type or dex number) must handle `undefined` gracefully (e.g., sorting items with missing metadata to the end).
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
