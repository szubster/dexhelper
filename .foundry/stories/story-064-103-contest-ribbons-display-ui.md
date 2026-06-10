---
id: story-064-103-contest-ribbons-display-ui
type: STORY
title: Contest Ribbons Display UI Component
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '4166943151401351874'
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

# Story: Contest Ribbons Display UI Component

## 1. Context
Derived from `epic-041-064-contest-ui-shared-components`, this story focuses on creating the reusable UI components to display the Contest Ribbons a Pokémon has earned.

## 2. Requirements
- The component must take a list or object representing the earned Contest Ribbons.
- It must render distinct icons or badges for each Ribbon type (Cool, Beauty, Cute, Smart, Tough) and their respective ranks (Normal, Super, Hyper, Master).
- If appropriate, include tooltips to describe the Ribbon.
- The styling must follow the global tactical UI guidelines.

## 3. Acceptance Criteria
- [ ] Implement the `ContestRibbonBadge` (or similar) React component(s).
- [ ] Add rendering tests to verify various Ribbon combinations display correctly.
- [ ] Ensure proper styling matching the project's aesthetics.
- [ ] .foundry/tasks/task-103-157-contest-ribbons-ui-impl.md
- [ ] .foundry/tasks/task-103-158-contest-ribbons-ui-qa.md
