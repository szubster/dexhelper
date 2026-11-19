---
id: task-677-734-refactor-kanban-permanent-failures-views
type: TASK
title: Refactor Kanban and Permanent Failures Views to use DagContext
status: COMPLETED
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-072-677-refactor-dashboard-views
tags:
  - react
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Refactor Kanban and Permanent Failures Views to use DagContext

## Overview
Refactor the Kanban view and the Permanent Failures view (if it's a separate component) within the DagDashboard to consume their node and edge data directly from `DagContext` instead of maintaining their own state. Ensure they respect filtering such as `showPermanentFailures`.

## Acceptance Criteria
- [x] Refactor `DagKanbanBoard` to fully rely on `DagContext` for state (nodes, filters).
- [x] Refactor Permanent Failures view (if distinct) or its logic in Kanban/DagContext to consume context correctly.
- [x] Update corresponding unit tests to mock and test context values.
- [x] Ensure seamless rendering across different views in `DagWrapper`.
