---
id: task-103-157-contest-ribbons-ui-impl
type: TASK
title: Implement Contest Ribbons Display UI Component
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '11592345276044395445'
pr_number: null
parent: story-064-103-contest-ribbons-display-ui
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

# Task: Implement Contest Ribbons Display UI Component

## Context
This task is derived from `story-064-103-contest-ribbons-display-ui` and involves implementing the reusable UI components to display Contest Ribbons a Pokémon has earned.

## Requirements
- Create a `ContestRibbonBadge` (or similar) React component.
- The component must accept properties to specify the Ribbon type (Cool, Beauty, Cute, Smart, Tough) and rank (Normal, Super, Hyper, Master).
- Implement tooltips to describe the Ribbon.
- Ensure the styling follows the global tactical UI guidelines.
- Add rendering tests (e.g., using Vitest/Playwright) to verify various Ribbon combinations display correctly.

## Contract
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement the `ContestRibbonBadge` React component(s).
- [ ] Ensure proper styling matching the project's aesthetics.
- [ ] Add rendering tests to verify various Ribbon combinations display correctly.
