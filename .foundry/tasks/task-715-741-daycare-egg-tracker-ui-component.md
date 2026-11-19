---
id: task-715-741-daycare-egg-tracker-ui-component
type: TASK
title: Implement Daycare Status Dashboard UI Component
status: READY
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-715-740-daycare-egg-tracker-ui-context
jules_session_id: null
pr_number: null
parent: story-107-715-daycare-egg-tracker-ui-core
priority: 50
confidence_score: null
tags:
  - react
  - ui
  - tailwind
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Task: Implement Daycare Status Dashboard UI Component

## Context
Following the context layer implementation, this task builds the presentation component `DaycareDashboard`. It surfaces the data and adheres strictly to the tactical hardware aesthetic.

## Objective
Implement the `DaycareDashboard` React component utilizing tactical UI primitives.

## Scope
- Create the `DaycareDashboard` component.
- Consume data from `DaycareContext`.
- Display up to two deposited Pokémon with their levels and EXP gained.
- Display a prominent visual indicator when an "Egg is waiting" flag is true.
- Strictly adhere to tactical aesthetic (ADR 008/024): use sharp edges (`rounded-none`), dashed borders (`border-dashed`), monospaced fonts, and existing `@utility` primitives (e.g., `tactical-panel`, `tactical-text`).

## Acceptance Criteria
- [ ] Implement `DaycareDashboard` component.
- [ ] Consume and display data from `DaycareContext`.
- [ ] Apply tactical hardware aesthetic primitives.
