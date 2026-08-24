---
id: epic-042-065-gen3-contest-advisor-ui
type: EPIC
title: Gen 3 Contest Advisor UI
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-09'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-042-gen3-contest-optimization-advisor
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
# Epic: Gen 3 Contest Advisor UI

## 1. Context
Derived from `prd-070-042-gen3-contest-optimization-advisor`, this epic handles the frontend integration of the Gen 3 Contest Optimization Advisor. It will consume the outputs from the algorithm epic (`epic-042-064-gen3-contest-advisor-algorithm`) to display actionable insights to the user.

## 2. Requirements

### 2.1 UI Components
- Design and build reusable UI components to display Contest recommendations.
- Integrate these components into the individual Pokémon detail view, alongside existing Contest Stats.

### 2.2 Result Presentation
- Clearly display the top 1-2 recommended Contest categories.
- Provide a brief, generated explanation for *why* a category was chosen (e.g., highlighting favorable Nature or high existing stat).

### 2.3 Warning States
- Implement visual warnings for edge cases identified by the algorithm.
- Specifically, alert users when a Pokémon has maxed out its Sheen but lacks the requisite stats for Master Rank contests, indicating a dead-end for optimization.

## 3. Acceptance Criteria
- [ ] Develop UI components for Contest recommendations.
- [ ] Integrate components into the Pokémon detail view.
- [ ] Implement clear reasoning copy for recommendations.
- [ ] Implement and test visual warning states for maxed Sheen scenarios.

### Stories
- [ ] .foundry/archive/stories/story-065-149-contest-recommendation-ui-components.md
- [ ] .foundry/archive/stories/story-065-150-contest-warning-states-ui.md
- [ ] .foundry/stories/story-065-151-contest-advisor-ui-integration.md
