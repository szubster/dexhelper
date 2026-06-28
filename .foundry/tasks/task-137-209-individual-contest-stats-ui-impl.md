---
id: task-137-209-individual-contest-stats-ui-impl
type: TASK
title: Implement Individual Contest Stats UI
status: ACTIVE
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '874095919134660341'
pr_number: null
parent: story-065-137-individual-contest-stats-ui
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Individual Contest Stats UI

## 1. Context
This task implements the UI required to show individual contest stats for a specific Pokémon inside `PokemonCaughtDetails.tsx`. The goal is to surface accurate numeric condition values (Cool, Beauty, Cute, Smart, Tough) and the total sheen.

## 2. Requirements
1. Update `src/components/pokemon/details/PokemonCaughtDetails.tsx`.
2. Check if the incoming `p.condition` object is available. If it is, display the values using `ContestConditionStats`.
3. Check if `p.condition.sheen` is available. If it is, display the value using `ContestSheenDisplay`.
4. Update `src/components/pokemon/details/__tests__/PokemonCaughtDetails.test.tsx` to include testing for these new visual components.

## 3. Acceptance Criteria
- [x] `ContestConditionStats` renders correctly within `PokemonCaughtDetails` if `condition` data is passed.
- [x] `ContestSheenDisplay` renders correctly within `PokemonCaughtDetails` if `condition` data contains `sheen`.
- [x] Tests in `PokemonCaughtDetails.test.tsx` cover the rendering of these new condition stat displays.
- [x] If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [x] If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [x] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
