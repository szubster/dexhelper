---
id: story-136-332-sorting-standard-strategies-v2
type: STORY
title: Implement Standard PC Box Sorting Strategies (v2)
status: READY
owner_persona: tech_lead
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - story-136-294-sorting-interface-base
  - research-136-331-sorting-standard-strategies-failure
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

# Story: Implement Standard PC Box Sorting Strategies (v2)

## Objective
Implement concrete sorting strategies using the base `SortingStrategy` interface defined in `story-136-294`. These standard strategies will allow users to sort their PC Boxes by common criteria such as Dex Number, Level, and Type.

## Context
This is a replacement for the permanently failed `story-136-295`. This story depends on `research-136-331` being completed first to understand the root cause of the previous failure and apply any necessary adjustments to the implementation plan.

## Acceptance Criteria
- [ ] Incorporate learnings and constraint adjustments from `research-136-331`.
- [ ] Implement a `DexNumberSorter` (supports both National and Regional variants).
- [ ] Implement a `LevelSorter` (supports ascending/descending).
- [ ] Implement a `TypeSorter` (sorts by primary type, then secondary type).
- [ ] Implement an `AlphaSorter` (alphabetical by nickname/species name).
- [ ] Break down story into tasks for technical blueprinting and implementation.
