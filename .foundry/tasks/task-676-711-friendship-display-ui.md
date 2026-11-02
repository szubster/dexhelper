---
id: task-676-711-friendship-display-ui
type: TASK
title: Implement Friendship Display and Progress Bar UI Component
status: ACTIVE
owner_persona: coder
created_at: '2026-10-19'
updated_at: '2026-11-01'
depends_on:
  - task-676-710-friendship-power-calc-logic
jules_session_id: '10256568948898492513'
pr_number: null
parent: story-095-676-friendship-display-and-power-calc
tags:
  - ui
  - react
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Friendship Display and Progress Bar UI Component

## Description
Implement the UI component to display the numeric Friendship value and a progress bar with a target value of 220 (the required value for friendship evolutions). The component should also consume the power calculation logic to display the base power for Return and Frustration. Ensure the UI adheres to the tactical hardware aesthetic guidelines (sharp edges `rounded-none`, monospaced fonts, `border-dashed`, etc.) using predefined Tailwind `@utility` directives.

## Acceptance Criteria
- [x] UI component implemented displaying Numeric Friendship and a progress bar targeting 220.
- [x] UI displays calculated base power for Return and Frustration using the implemented logic.
- [x] Component conforms to tactical hardware aesthetics.
- [x] Component unit tests are implemented verifying correct rendering.
