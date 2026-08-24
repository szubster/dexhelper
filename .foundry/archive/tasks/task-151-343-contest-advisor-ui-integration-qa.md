---
id: task-151-343-contest-advisor-ui-integration-qa
type: TASK
title: QA Contest Advisor UI Integration
status: COMPLETED
owner_persona: qa
created_at: '2026-07-22'
updated_at: '2026-08-23'
depends_on:
  - task-151-342-contest-advisor-ui-integration-impl
jules_session_id: null
pr_number: null
parent: story-065-151-contest-advisor-ui-integration
tags:
  - feature
  - gen3
  - contests
  - advisor
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: QA Contest Advisor UI Integration

## Description
Verify that the `ContestRecommendationPanel` has been correctly integrated into the `PokemonDetails` view for Gen 3 Pokemon.

## Acceptance Criteria
- [x] Ensure `ContestRecommendationPanel` is rendered in `PokemonDetails` view only for `saveData?.generation === 3`.
- [x] Ensure it correctly receives `recommendations` and `sheen` values.
- [x] Verify that UI matches tactical theme constraints (no rounded edges).
