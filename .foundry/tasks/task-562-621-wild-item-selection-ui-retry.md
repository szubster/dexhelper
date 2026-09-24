---
id: task-562-621-wild-item-selection-ui-retry
type: TASK
title: Wild Item Selection UI Implementation Retry
status: PENDING
owner_persona: coder
created_at: '2026-09-24'
updated_at: '2026-09-24'
depends_on:
  - research-562-620-investigate-wild-item-ui-failure
  - task-562-578-wild-item-selection-state
jules_session_id: null
pr_number: null
parent: story-555-562-wild-item-selection-ui
tags:
  - dexhelper
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Wild Item Selection UI Implementation Retry

## Context
As part of the Wild Item Hunting UI epic, we need a user interface for users to select target items they want to hunt in the wild. This is a retry of the permanently failed task `task-562-579-wild-item-selection-ui`.

## Requirements
- Review the findings in `research-562-620-investigate-wild-item-ui-failure` and implement any recommended architectural adjustments.
- Create a reusable React component (e.g., `WildItemSelector`) that allows users to search for and select items they wish to hunt.
- Integrate the component with the state management layer implemented in `task-562-578-wild-item-selection-state`.
- Adhere strictly to the tactical hardware aesthetic guidelines (ADR 008):
  - Explicitly use sharp edges (`rounded-none`).
  - Use dashed borders (`border-dashed`) if applicable.
  - Use monospaced telemetry fonts (e.g. `font-mono`).
- Re-use existing UI primitives from `src/components/` where possible (e.g., TacticalButton, TacticalPanel).

## Acceptance Criteria
- [ ] Implement `WildItemSelector` component with adjustments from research.
- [ ] Connect component to state store for selected items.
- [ ] Style the component according to tactical hardware guidelines.
