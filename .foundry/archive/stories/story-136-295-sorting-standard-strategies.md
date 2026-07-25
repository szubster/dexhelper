---
id: story-136-295-sorting-standard-strategies
type: STORY
title: Implement Standard PC Box Sorting Strategies
status: CANCELLED
owner_persona: tech_lead
created_at: '2026-07-10'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: '2079813014804897131'
pr_number: null
parent: epic-106-136-pc-box-sorting-algorithms
tags:
  - feature
  - sorting
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---
# Story: Implement Standard PC Box Sorting Strategies

## Objective
Implement concrete sorting strategies using the base `SortingStrategy` interface defined in `story-136-294`. These standard strategies will allow users to sort their PC Boxes by common criteria such as Dex Number, Level, and Type.

## Context
Building upon the standard interface, we need specific, actionable sorters that understand the `PokeData` structure.

## Acceptance Criteria
- [ ] Implement a `DexNumberSorter` (supports both National and Regional variants).
- [ ] Implement a `LevelSorter` (supports ascending/descending).
- [ ] Implement a `TypeSorter` (sorts by primary type, then secondary type).
- [ ] Implement an `AlphaSorter` (alphabetical by nickname/species name).
- [x] Break down story into tasks for technical blueprinting and implementation.
- [ ] task-295-329-standard-sorting-strategies-impl
- [ ] task-295-330-standard-sorting-strategies-qa
- [ ] task-295-327-sorting-strategies-impl
- [ ] task-295-328-sorting-strategies-qa
