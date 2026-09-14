---
id: task-562-579-wild-item-selection-ui
type: TASK
title: Wild Item Selection UI Implementation
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
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

# Task: Wild Item Selection UI Implementation

## Context
As part of the Wild Item Hunting UI epic, we need a user interface for users to select target items they want to hunt in the wild.

## Requirements
- Create a reusable React component (e.g., `WildItemSelector`) that allows users to search for and select items they wish to hunt.
- Integrate the component with the state management layer implemented in `task-562-578-wild-item-selection-state`.
- Adhere strictly to the tactical hardware aesthetic guidelines (ADR 008):
  - Explicitly use sharp edges (`rounded-none`).
  - Use dashed borders (`border-dashed`) if applicable.
  - Use monospaced telemetry fonts (e.g. `font-mono`).
- Re-use existing UI primitives from `src/components/` where possible (e.g., TacticalButton, TacticalPanel).

## Acceptance Criteria
- [ ] Implement `WildItemSelector` component.
- [ ] Connect component to state store for selected items.
- [ ] Style the component according to tactical hardware guidelines.
