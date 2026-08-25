---
id: task-136-489-permanent-failure-state-selectors-impl
type: TASK
title: Implement Permanent Failure State Selectors
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '14515920951439317342'
pr_number: null
parent: story-047-136-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
  - dashboard
  - context
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement Permanent Failure State Selectors

## Objective
Implement logic within the DAG context to identify nodes that have permanently failed (status: FAILED and rejection_count >= MAX_REJECTION_THRESHOLD).

## Context
As defined in ADR 017, we need to extract and expose the `rejection_count` frontmatter field and broadcast it via the shared React Context.

## Acceptance Criteria
- [x] Expose `rejection_count` in the DAG node data model.
- [x] Implement a selector or hook to filter and return a list of permanently failed nodes from the shared context.
- [x] Write unit tests to verify the selector logic correctly identifies failed nodes based on the threshold.
