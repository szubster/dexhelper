---
id: task-566-581-shoal-tide-display
type: TASK
title: Implement Shoal Cave Tide Display Component
status: READY
owner_persona: coder
created_at: '2026-09-16T11:21:37Z'
updated_at: '2026-09-16T11:21:37Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-566-shoal-cave-ui-components
tags:
  - ui
  - gen3
  - shoal-cave
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Shoal Cave Tide Display Component

## Description
Implement the `TideDisplay` React component for the Shoal Cave Dashboard. It should display the current in-game tide (High/Low) and a countdown to the next tide change.

## Constraints
- The UI MUST follow the tactical hardware aesthetic constraints (`rounded-none`, `border-dashed`, monospaced telemetry fonts) outlined in ADR 008.

## Acceptance Criteria
- [ ] Create `TideDisplay.tsx` component.
- [ ] Display the current tide (High/Low).
- [ ] Display a countdown to the next tide change.
- [ ] Write Vitest browser tests for the component.
