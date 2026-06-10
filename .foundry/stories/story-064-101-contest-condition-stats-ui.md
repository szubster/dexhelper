---
id: story-064-101-contest-condition-stats-ui
type: STORY
title: Contest Condition Stats UI Component
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '3612742036789070596'
pr_number: null
parent: epic-041-064-contest-ui-shared-components
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Contest Condition Stats UI Component

## 1. Context
Derived from `epic-041-064-contest-ui-shared-components`, this story focuses on creating the reusable UI component(s) to display a Pokémon's Contest stats: Cool, Beauty, Cute, Smart, and Tough.

## 2. Requirements
- The component must accept numerical values (0-255) for all five condition categories.
- The visual presentation should be clear and accessible (e.g., a spider graph, bar charts, or a cleanly formatted numerical table).
- The component must adhere to the tactical styling and color palette described in the project style guides.
- The component must handle cases where the data is missing or zero gracefully.

## 3. Acceptance Criteria
- [ ] Implement the `ContestConditionStats` React component.
- [ ] Add rendering tests to verify that it displays values correctly.
- [ ] Ensure proper styling matching the project's aesthetics.

- [ ] .foundry/tasks/task-101-157-contest-condition-stats-ui-impl.md
- [ ] .foundry/tasks/task-101-158-contest-condition-stats-ui-qa.md
