---
id: story-136-333-sorting-standard-strategies-retry
type: STORY
title: Implement Standard PC Box Sorting Strategies (Retry)
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-29'
depends_on:
  - research-136-330-investigate-sorting-strategies-failure
jules_session_id: '5206166470138702986'
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
- [ ] Implement a `DexNumberSorter` (supports both National and Regional variants).
- [ ] Implement a `LevelSorter` (supports ascending/descending).
- [ ] Implement a `TypeSorter` (sorts by primary type, then secondary type).
- [ ] Implement an `AlphaSorter` (alphabetical by nickname/species name).
- [x] Break down story into tasks for technical blueprinting and implementation.
- [ ] [task-333-363-pokemon-types-data-impl](.foundry/tasks/task-333-363-pokemon-types-data-impl.md)
- [ ] [task-333-364-pokemon-types-data-qa](.foundry/tasks/task-333-364-pokemon-types-data-qa.md)
- [ ] [task-333-365-sorting-strategies-impl](.foundry/tasks/task-333-365-sorting-strategies-impl.md)
- [ ] [task-333-366-sorting-strategies-qa](.foundry/tasks/task-333-366-sorting-strategies-qa.md)
