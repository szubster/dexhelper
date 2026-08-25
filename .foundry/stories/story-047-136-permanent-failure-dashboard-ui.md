---
id: story-047-136-permanent-failure-dashboard-ui
type: STORY
title: Implement Permanent Failure Dashboard UI
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-15'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '16234471613315261228'
pr_number: null
parent: epic-034-047-permanent-failure-dashboard-ui
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

## Objective
Implement a "Permanent Failures" view in the DAG Dashboard that consumes the `rejection_count` property from the shared React Context and visually highlights nodes that have failed permanently.

## Context
As per ADR 017 and the parent Epic `epic-034-047-permanent-failure-dashboard-ui`, we need to provide immediate visibility into system deadlocks without requiring manual inspection of repository files.
The Permanent Failure Dashboard will consume the same shared raw parsed DAG data as the React Flow DAG visualizer and Kanban Board, adhering to the single source of truth principle (ADR 013). This story relies on the shared context integration from `story-046-120-integrate-dag-context-with-views`.

## Acceptance Criteria
- [ ] Break down into Tasks
