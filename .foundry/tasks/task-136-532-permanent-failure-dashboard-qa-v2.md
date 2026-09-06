---
id: task-136-532-permanent-failure-dashboard-qa-v2
type: TASK
title: Permanent Failure Dashboard UI QA (v2)
status: PENDING
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-136-490-permanent-failure-flow-ui-impl
  - task-136-531-permanent-failure-kanban-ui-impl-v2
jules_session_id: null
pr_number: null
parent: story-047-136-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
  - dashboard
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Permanent Failure Dashboard UI QA (v2)

## Objective
Verify the implementation of the Permanent Failure Dashboard UI across both Flow and Kanban views.

## Context
Ensure that the new features function correctly and meet all architectural constraints (ADR 008, ADR 013, ADR 017). This task is a replacement for `task-136-492-permanent-failure-dashboard-qa`.

## Acceptance Criteria
- [ ] Verify permanently failed nodes are accurately identified from the shared React Context.
- [ ] Verify React Flow view correctly highlights failed nodes according to ADR 008 styling rules.
- [ ] Verify Kanban Board correctly displays and highlights failed nodes.
