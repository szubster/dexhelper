---
id: task-294-316-sorting-interface-base-impl
type: TASK
title: Implement PC Box Sorting Interface and Base Classes
status: ACTIVE
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-14'
depends_on: []
jules_session_id: '11179067958224542396'
pr_number: null
parent: story-136-294-sorting-interface-base
tags:
  - implementation
  - sorting
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement PC Box Sorting Interface and Base Classes

## Objective
Implement the core `SortingStrategy` interface and base classes required for the PC Box sorting engine, ensuring flexibility to handle various sorting criteria and compatibility with cross-generation `PokeData` payloads.

## Context
This forms the foundational interface for the PC Box diff engine. By defining a standard interface, we can interchangeably use different sorting strategies (like National Dex order, Level ascending, Type grouping) to calculate the optimal layout state.

## Requirements
1. **Define `SortingStrategy` Interface:**
   - Create a TypeScript interface or type definition that represents a sorting strategy.
   - It must conform to a standard comparison function signature (e.g., `(a: PokeData, b: PokeData) => number`).
2. **Implement `MultiCriterionSorter` Base Class:**
   - Create a base class or utility function `MultiCriterionSorter` that accepts an array of `SortingStrategy` functions.
   - It should chain these strategies sequentially. If the first strategy determines equality (returns `0`), it should fall back to the second strategy, and so on.
3. **Cross-Generation Compatibility:**
   - Ensure the interface explicitly references and accepts standard `PokeData` application objects (or a generic interface that `PokeData` satisfies) so it works seamlessly across Gen 1, Gen 2, and Gen 3 structures.

## Coder and QA Reminders
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task (e.g., if the code is already implemented), you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save File Parsing (Contextual):** When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers. (While this task is primarily logical, adhere to this rule if interacting with any underlying data extraction).

## Acceptance Criteria
- [x] `SortingStrategy` interface is defined and exported.
- [x] `MultiCriterionSorter` is implemented and allows chaining multiple `SortingStrategy` functions.
- [x] Tests verify that the `MultiCriterionSorter` correctly prioritizes primary strategies and falls back to secondary strategies on equality.
