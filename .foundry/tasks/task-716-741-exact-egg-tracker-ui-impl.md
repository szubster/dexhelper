---
id: task-716-741-exact-egg-tracker-ui-impl
type: TASK
title: Exact Egg Tracker UI Implementation
status: PENDING
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-716-740-exact-egg-tracker-logic-impl
jules_session_id: null
pr_number: null
parent: story-107-716-exact-egg-tracker-component
priority: 50
confidence_score: null
tags:
  - gen2
  - gen3
  - breeding
  - ui
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Task: Exact Egg Tracker UI Implementation

## Context
As part of Epic `epic-053-107-daycare-egg-tracker-ui`, we are building the Exact Egg Tracker component. We need the UI component to display the exact numerical step count remaining until an Egg hatches, using the logic implemented in `task-716-740-exact-egg-tracker-logic-impl`.

## Objective
Implement the `ExactEggTracker` React component aligned with the tactical hardware aesthetic.

## Scope
- Create a React component `ExactEggTracker` that displays Eggs currently in the player's Party or PC.
- Consume the logic for remaining egg cycles/steps.
- Adhere strictly to the "tactical hardware/snooping" aesthetic outlined in ADR 008 and ADR 024.
  - Explicitly use sharp edges (`rounded-none`).
  - Use dashed borders (`border-dashed`).
  - Use monospaced telemetry fonts (e.g. `font-mono`).
  - Use defined `@utility` tactical primitives from `src/index.css` (such as `tactical-panel`, `tactical-text`, `tactical-button`) rather than repeating raw inline Tailwind layout or typography classes.

## Acceptance Criteria
- [ ] Implement `ExactEggTracker` React component.
- [ ] Explicitly integrate component into the application's view hierarchy (Party/PC views) or add relevant rendering tests.
- [ ] Apply `@utility` tactical primitives and ensure compliance with ADR 008 & 024.
