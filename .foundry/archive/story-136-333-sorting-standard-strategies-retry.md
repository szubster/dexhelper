---
id: story-136-333-sorting-standard-strategies-retry
type: STORY
title: Implement Standard PC Box Sorting Strategies (Retry)
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-08-01'
depends_on:
  - research-136-330-investigate-sorting-strategies-failure
jules_session_id: null
pr_number: null
parent: epic-106-136-pc-box-sorting-algorithms
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Implement Standard PC Box Sorting Strategies

## Objective
Implement concrete sorting strategies using the base `SortingStrategy` interface defined in `story-136-294`. These standard strategies will allow users to sort their PC Boxes by common criteria such as Dex Number, Level, and Type. Incorporate findings from `research-136-330-investigate-sorting-strategies-failure`.

## Context
Building upon the standard interface, we need specific, actionable sorters that understand the `PokeData` structure.

## Acceptance Criteria
- [x] Implement a `DexNumberSorter` (supports both National and Regional variants).
- [x] Implement a `LevelSorter` (supports ascending/descending).
- [x] Implement a `TypeSorter` (sorts by primary type, then secondary type).
- [x] Implement an `AlphaSorter` (alphabetical by nickname/species name).
- [x] Break down story into tasks for technical blueprinting and implementation.
- [x] [task-333-363-pokemon-types-data-impl](.foundry/archive/tasks/task-333-363-pokemon-types-data-impl.md)
- [x] [task-333-364-pokemon-types-data-qa](.foundry/archive/task-333-364-pokemon-types-data-qa.md)
- [x] [task-333-365-sorting-strategies-impl](.foundry/archive/task-333-365-sorting-strategies-impl.md)
- [x] [task-333-366-sorting-strategies-qa](.foundry/archive/tasks/task-333-366-sorting-strategies-qa.md)
- [x] [research-333-361-investigate-pokemon-types-failure](.foundry/archive/research-333-361-investigate-pokemon-types-failure.md)
- [x] [task-333-369-pokemon-types-data-retry-impl](.foundry/archive/task-333-369-pokemon-types-data-retry-impl.md)
- [x] [task-333-370-pokemon-types-data-retry-qa](.foundry/archive/task-333-370-pokemon-types-data-retry-qa.md)
- [x] [task-333-371-sorting-strategies-retry-qa](.foundry/archive/task-333-371-sorting-strategies-retry-qa.md)
- [x] task-333-375-sorting-strategies-regional-dex-impl
- [x] task-333-376-sorting-strategies-regional-dex-qa
- [x] task-333-382-sorting-strategies-core-impl
- [x] task-333-383-sorting-strategies-core-qa
