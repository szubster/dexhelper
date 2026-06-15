---
id: epic-034-047-permanent-failure-dashboard-ui
type: EPIC
title: Implement Permanent Failure Dashboard UI
status: ACTIVE
owner_persona: story_owner
created_at: '2026-05-22'
updated_at: '2026-06-15'
depends_on:
  - epic-034-046-dag-data-parsing-rejection-count
jules_session_id: '9221934097684156644'
pr_number: null
parent: prd-063-034-permanent-failure-dashboard
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Permanent Failure Dashboard UI

## Context
As per ADR 017 and PRD `prd-063-034-permanent-failure-dashboard`, we need a "Permanent Failures" view in the DAG Dashboard. This epic handles the UI implementation, which relies on the `rejection_count` data exposed by `epic-034-046-dag-data-parsing-rejection-count`.

## High-Level Requirements
1. **View/Filter Integration**: Add a new view mode or filter to the existing DAG Dashboard UI (built on React Flow / Kanban Board).
2. **Filtering Logic**: The UI should filter nodes based on the shared context, selecting those with `status: FAILED` and `rejection_count >= MAX_REJECTION_THRESHOLD`.
3. **Visual Highlighting**: Ensure permanently failed nodes are visually distinct to allow the Tech Lead or Product Manager to quickly identify deadlocks.

## Acceptance Criteria
- [ ] Story Owner: Create a Story to implement the UI for the permanent failure view/filter.
- [ ] Story Owner: Ensure the new UI correctly consumes the `rejection_count` property from the shared React Context.
