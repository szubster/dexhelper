---
id: task-333-382-sorting-strategies-core-impl
type: TASK
title: Implement Core PC Box Sorting Strategies
status: READY
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on: []
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

# Task: Implement Core PC Box Sorting Strategies

## Context
We need specific, actionable sorters that understand the `PokeData` structure. These standard strategies will allow users to sort their PC Boxes by common criteria such as Dex Number, Level, and Type.

## Requirements
Implement concrete sorting strategies using the base `SortingStrategy` interface defined in `story-136-294`. Place implementations in `src/engine/sorting/StandardSorters.ts`.

1. **`DexNumberSorter`**: Supports both National and Regional variants via configuration (`variant: 'national' | 'regional'`). If `regional` is requested but unsupported, fallback to `speciesId` or throw a clear error.
2. **`LevelSorter`**: Constructor takes `direction: 'asc' | 'desc'`. Sort by `instance.level`.
3. **`TypeSorter`**: Sort by primary type, then secondary type. Handle missing metadata or missing types gracefully (put them at the end).
4. **`AlphaSorter`**: Sort alphabetically by `instance.nickname`. If missing, fallback to species name, then string representation of `speciesId`.

## Important Guidelines
- Strictly adhere to **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
- Write comprehensive unit tests for each strategy using Vitest in a corresponding `.test.ts` file.

## Acceptance Criteria
- [ ] `DexNumberSorter` is implemented and supports both National and Regional variants.
- [ ] `LevelSorter` is implemented with asc/desc support.
- [ ] `TypeSorter` is implemented and gracefully handles missing data.
- [ ] `AlphaSorter` is implemented.
- [ ] Comprehensive unit tests are provided in `StandardSorters.test.ts`.
- [ ] `pnpm lint` and `pnpm test` pass.
