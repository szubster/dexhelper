---
id: task-136-490-permanent-failure-flow-ui-impl
type: TASK
title: Implement Permanent Failure Flow UI
status: READY
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on:
  - task-136-489-permanent-failure-state-selectors-impl
jules_session_id: null
pr_number: null
parent: story-047-136-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
  - dashboard
  - react-flow
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement Permanent Failure Flow UI

## Objective
Update the React Flow DAG visualizer to visually highlight nodes that have failed permanently.

## Context
Following ADR 008, the UI must adhere strictly to the tactical hardware aesthetic. The React Flow visualizer needs a new view mode or styling updates to emphasize failed nodes.

## Acceptance Criteria
- [ ] Implement visual highlighting (e.g., specific border colors, warning icons) for permanently failed nodes in the React Flow view.
- [ ] Ensure styling adheres to the strict tactical hardware aesthetic (sharp edges, monospaced fonts, etc.).
- [ ] Add a filter/toggle control to switch to a 'Permanent Failures' view if necessary.
- [ ] Write component tests using vitest-browser-react to verify rendering.
