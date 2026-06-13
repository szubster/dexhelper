---
id: task-102-157-contest-sheen-display-impl
type: TASK
title: Implement Contest Sheen Display Component
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '4303746179125692537'
pr_number: null
parent: story-064-102-contest-sheen-display-ui
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

# Task: Implement Contest Sheen Display Component

## Context
This task is part of `story-064-102-contest-sheen-display-ui`, which aims to create a reusable UI component to visualize a Pokémon's Sheen value (0-255) for Gen 3 Contests.

## Requirements
- Create `ContestSheenDisplay` React component.
- The component takes a Sheen numerical value between 0 and 255.
- It must represent this value relative to the max of 255.
- Visually indicate when Sheen is maxed out.
- Ensure the styling is consistent with the app's tactical hardware aesthetic (e.g., using `tactical-panel` utility, strict borders, monospace fonts).

## Important Instructions
- If you permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Do NOT modify the YAML frontmatter unless permanently failing or cancelling the task. Only check off the markdown boxes below when completing the work.

## Acceptance Criteria
- [x] Implement `ContestSheenDisplay` React component in `src/components/pokemon/details/`.
- [x] Ensure the component properly handles values from 0 to 255, filling up a visual meter/bar.
- [x] Ensure styles follow the tactical hardware aesthetic.
