---
id: task-245-250-gen2-box-grouping-qa
type: TASK
title: QA Gen 2 Box Parsing Grouping
status: COMPLETED
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-03'
depends_on:
  - task-245-249-gen2-box-grouping-impl
jules_session_id: null
pr_number: null
parent: story-108-245-gen2-box-parsing
tags:
  - qa
  - backend
  - save-parsing
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 2 Box Parsing Grouping

## Objective
Verify the correctness of the Gen 2 Box Parsing grouping implementation.

## Context
A coder has implemented logic to group Gen 2 `PokemonInstance` data by `speciesId` for the Comparison Matrix UI. The critical requirement is that this grouping logic MUST exclude Party and Daycare Pokémon to prevent accidental release.

## Verification Steps
1.  Verify the existence of the grouping utility (e.g., `boxGrouping.ts`).
2.  Review the unit tests to ensure they explicitly test that Party/Daycare Pokémon are filtered out of the resulting grouped object.
3.  Run all unit tests to ensure they pass and do not introduce regressions.
4.  Verify that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Reminders
*   If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Grouping logic correctly aggregates by species ID.
- [x] Grouping logic successfully filters out Party and Daycare Pokémon.
- [x] Unit tests pass and provide sufficient coverage.
- [x] Verify that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
