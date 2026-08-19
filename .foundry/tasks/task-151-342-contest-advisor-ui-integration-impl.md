---
id: task-151-342-contest-advisor-ui-integration-impl
type: TASK
title: Implement Contest Advisor UI Integration
status: ACTIVE
owner_persona: coder
created_at: '2026-07-22'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '67518662645380301'
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
# Task: Implement Contest Advisor UI Integration

## Description
Integrate the newly developed `ContestRecommendationPanel` into the `src/components/PokemonDetails.tsx` view for Gen 3. The recommendation UI should include warning states if applicable.

## Technical Contract
1. In `src/components/PokemonDetails.tsx`, import `ContestRecommendationPanel`.
2. Locate a suitable place to display contest recommendations alongside the existing Contest Stats.
3. Only display the `ContestRecommendationPanel` if `saveData?.generation === 3`.
4. Ensure you pass required props to `ContestRecommendationPanel`: `recommendations` and `sheen`.

## Acceptance Criteria
- [ ] `ContestRecommendationPanel` is integrated into `PokemonDetails.tsx`.
- [ ] It renders correctly for Gen 3 Pokemon in the details view.
