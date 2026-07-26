---
id: task-295-329-standard-sorting-strategies-impl
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
  - implementation
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---
# Task: Implement Standard PC Box Sorting Strategies

## Objective
Implement concrete sorting strategies (`DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) using the base `SortingStrategy` interface defined in `story-136-294` (`task-294-316`).

## Context
These standard strategies will allow users to sort their PC Boxes by common criteria. They must understand the `SortablePokemon` structure (combining `PokemonInstance` and `PokemonMetadata`).

## Acceptance Criteria
- [ ] Implement a `DexNumberSorter` (supports both National and Regional variants via configuration).
- [ ] Implement a `LevelSorter` (supports ascending/descending).
- [ ] Implement a `TypeSorter` (sorts by primary type, then secondary type).
- [ ] Implement an `AlphaSorter` (alphabetical by nickname, fallback to species name).
- [ ] Write tests for each sorter to ensure correctness.

## Coder Reminders
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Magic Numbers:** When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- **Gen 3 Offsets:** When drafting blueprints for Gen 3 save file parsing, explicitly require that the Coder uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
