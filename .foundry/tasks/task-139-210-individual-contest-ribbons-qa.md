---
id: task-139-210-individual-contest-ribbons-qa
type: TASK
title: QA Individual Contest Ribbons Integration
status: PENDING
owner_persona: qa
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on:
  - task-139-209-individual-contest-ribbons-impl
jules_session_id: null
pr_number: null
parent: story-065-139-individual-contest-ribbons-ui
tags:
  - feature
  - gen3
  - contests
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Individual Contest Ribbons Integration

## Context
This task is to verify the implementation of `task-139-209-individual-contest-ribbons-impl` which integrates the display of Contest Ribbons into the individual Pokémon details view (`PokemonCaughtDetails`).

## Requirements
1. Verify that `ContestRibbonsPanel` (or similar) was created and correctly integrated into `PokemonCaughtDetails.tsx`.
2. Verify that the numerical ribbon ranks (`1` through `4`) are correctly mapped to their respective strings (`Normal`, `Super`, `Hyper`, `Master`).
3. Verify that a rank of `0` results in no badge being displayed for that specific condition.
4. Verify that unit/rendering tests have been added and properly cover the mapping and display logic.
5. Verify that the UI follows the global tactical UI guidelines.

## Contract
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `ContestRibbonsPanel` renders correctly inside `PokemonCaughtDetails` only when `p.ribbons` is defined.
- [ ] Verify the numerical rank mapping logic (1=Normal, 2=Super, 3=Hyper, 4=Master, 0=Hidden).
- [ ] Verify proper test coverage for the new component and integration.
