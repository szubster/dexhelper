---
id: task-295-329-sorting-standard-strategies-impl
type: TASK
title: Implement Standard PC Box Sorting Strategies
status: PENDING
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - task-294-316-sorting-interface-base-impl
jules_session_id: null
pr_number: null
parent: story-136-295-sorting-standard-strategies
tags:
  - feature
  - sorting
  - implementation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Standard PC Box Sorting Strategies

## Objective
Implement concrete sorting strategies (`DexNumberSorter`, `LevelSorter`, `TypeSorter`, `AlphaSorter`) using the base `SortingStrategy` interface defined in `story-136-294`.

## Technical Blueprint

### Contract requirements

1. **`DexNumberSorter`**:
    - Should support both National and Regional Pokédex numbers.
    - Implement an ascending order based on `pokemon.pokedexNumbers.national` or `pokemon.pokedexNumbers.regional`.

2. **`LevelSorter`**:
    - Implement sorting by the Pokemon's level.
    - Should support both ascending and descending order.

3. **`TypeSorter`**:
    - Implement sorting primarily by the primary type (`types[0]`).
    - If primary types match, it should sort by the secondary type (`types[1]`).

4. **`AlphaSorter`**:
    - Implement alphabetical sorting.
    - Prioritize sorting by `nickname` if present, otherwise fallback to species `name`.

### Context & Guidance

-   Refer to the interface definition established in `story-136-294` (`task-294-316`).
-   Use standard `PokeData` payloads for strategy input arguments.
-   Follow all coding conventions, including Biome linting and Prettier formatting rules (`pnpm check:fix`).

### Testing
- You must create unit tests for each strategy within `src/engine/sorting/` (or the corresponding strategy directory) to ensure they sort the Pokemon correctly.

## REMINDER FOR CODER
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DexNumberSorter` (supports National and Regional).
- [ ] Implement `LevelSorter` (ascending and descending).
- [ ] Implement `TypeSorter` (primary then secondary type).
- [ ] Implement `AlphaSorter` (alphabetical by nickname or species name).
- [ ] Add unit tests for all strategies.
