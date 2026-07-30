---
id: task-333-365-sorting-strategies-impl
type: TASK
title: Implement PC Box Sorting Strategies
status: ACTIVE
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-30'
depends_on:
  - task-333-363-pokemon-types-data-impl
jules_session_id: '1822939805966644680'
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

# Task: Implement PC Box Sorting Strategies

## Context
With Pokemon types now available in our metadata schema, we can safely implement concrete sorting strategies for PC Boxes, fulfilling `story-136-333`.

## Requirements
Implement the following sorter functions/classes that conform to the `SortingStrategy` interface defined in `src/engine/sorting/SortingStrategy.ts`:

1. **`DexNumberSorter`**:
   - Constructor/Factory takes a configuration: `variant: 'national' | 'regional'`.
   - Sort by `instance.speciesId` (which maps to National Dex). If `regional` is requested but unsupported, fallback to `speciesId` or throw a clear error.
2. **`LevelSorter`**:
   - Constructor/Factory takes `direction: 'asc' | 'desc'`.
   - Sort by `instance.level`.
3. **`TypeSorter`**:
   - Sort by primary type (`metadata.types[0]`), then secondary type (`metadata.types[1]`).
   - Handle missing metadata or missing types gracefully (put them at the end).
4. **`AlphaSorter`**:
   - Sort alphabetically by `instance.nickname`.
   - If `nickname` is missing/empty, fallback to `metadata.n` (the species name).
   - If `metadata` is also missing, fallback to a string representation of `speciesId`.

## Important Guidelines
- Strictly adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md` if any save file parsing is needed for these implementations.
- Place the implementations in `src/engine/sorting/` (e.g., `StandardSorters.ts` or individual files).
- Write comprehensive unit tests for each strategy using Vitest in a corresponding `.test.ts` file.

## Acceptance Criteria
- [ ] `DexNumberSorter` is implemented.
- [ ] `LevelSorter` is implemented with asc/desc support.
- [ ] `TypeSorter` is implemented and utilizes the new `types` metadata.
- [ ] `AlphaSorter` is implemented.
- [ ] Unit tests are provided for all sorters and `pnpm test` passes.
