---
id: task-136-491-permanent-failure-kanban-ui-impl
type: TASK
title: Implement Permanent Failure Kanban UI
status: PENDING
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - task-136-489-permanent-failure-state-selectors-impl
jules_session_id: null
pr_number: null
parent: story-047-136-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
  - dashboard
  - kanban
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement Permanent Failure Kanban UI

## Objective
Update the Kanban Board view to display and highlight permanently failed nodes.

## Context
As per ADR 013, the Kanban Board shares the same state context. We need to leverage the permanently failed node list in the board view.

## Acceptance Criteria
- [ ] Integrate the failed node data into the Kanban Board view.
- [ ] Highlight permanently failed nodes visually within their respective columns.
- [ ] Write component tests to verify the board correctly renders failed nodes.
