---
id: task-578-590-visualizer-ui-refactor
type: TASK
title: React Flow Visualizer UI Refactor
status: PENDING
owner_persona: coder
created_at: '2026-09-17T14:13:10Z'
updated_at: '2026-09-19'
depends_on:
  - task-578-589-visualizer-state-refactor
jules_session_id: null
pr_number: null
parent: story-079-578-react-flow-visualizer-refactor
tags:
  - architecture
  - react-flow
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# React Flow Visualizer UI Refactor

## Description
Update `DagDashboard` and related visualizer components to consume `nodes` and `edges` directly from `DagContext` without prop drilling.

## Acceptance Criteria
- [ ] Refactor `DagDashboard` to use `useDagContext` for nodes and edges.
- [ ] Remove node and edge prop drilling from child visualizer components.
- [ ] Ensure that UI adheres to tactical hardware aesthetic guidelines.
