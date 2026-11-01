---
id: task-677-735-refactor-dashboard-views-e2e-qa
type: TASK
title: QA Dashboard Views Refactor
status: READY
owner_persona: qa
created_at: '2026-10-14'
updated_at: '2026-10-14'
depends_on:
  - task-677-734-refactor-kanban-permanent-failures-views
jules_session_id: null
pr_number: null
parent: story-072-677-refactor-dashboard-views
tags: [qa, testing]
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Dashboard Views Refactor

## Overview
Verify that the Kanban and Permanent Failures views have been correctly refactored to consume data from `DagContext` and ensure there are no regressions in their rendering.

## Acceptance Criteria
- [ ] Verify `DagKanbanBoard` correctly filters and groups nodes from `DagContext`.
- [ ] Verify that toggling `showPermanentFailures` works correctly in the Kanban view.
- [ ] Ensure unit tests have been updated and pass successfully.
