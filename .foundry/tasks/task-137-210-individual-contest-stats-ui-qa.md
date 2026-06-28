---
id: task-137-210-individual-contest-stats-ui-qa
type: TASK
title: QA Individual Contest Stats UI
status: READY
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-06-28'
depends_on:
  - task-137-209-individual-contest-stats-ui-impl
jules_session_id: null
pr_number: null
parent: story-065-137-individual-contest-stats-ui
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Individual Contest Stats UI

## 1. Context
This task verifies the implementation of the individual contest stats display within the Pokémon details view, ensuring that `PokemonCaughtDetails` correctly uses `ContestConditionStats` and `ContestSheenDisplay`.

## 2. Verification Steps
1. Verify `src/components/pokemon/details/PokemonCaughtDetails.tsx` correctly renders `ContestConditionStats` and `ContestSheenDisplay` when given a mocked Pokemon object containing `condition` properties.
2. Verify test cases were written in `PokemonCaughtDetails.test.tsx` and that they pass.

## 3. Acceptance Criteria
- [x] `PokemonCaughtDetails` successfully renders the new stats visually.
- [x] Unit tests pass cleanly.
- [x] If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [x] If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [x] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
