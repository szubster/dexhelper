---
id: task-478-639-orchestrator-cloning-logic-retry
type: TASK
title: Implement DAG Node Cloning Logic (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-09-16'
updated_at: '2026-10-03'
depends_on:
  - research-478-638-investigate-cloning-logic-failure
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - generation
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-478-638-investigate-cloning-logic-failure
notes: ''
locks: []
---

# Task: Implement DAG Node Cloning Logic (Retry)

## Objective
Implement the logic to duplicate node structures and assign collision-free IDs within the Orchestrator DAG based on research findings.

## Scope
1. Implement logic to duplicate DAG nodes based on variant specifications.
2. Generate distinct node IDs for clones following the Parent-Linked ID Schema (`<type>-<parent_NNN>-<NNN>-<slug>`).
3. Ensure parent-child relationships and metadata dependencies are correctly remapped for clones.

## Acceptance Criteria
- [ ] Implement core node duplication function.
- [ ] Validate new node IDs against collision-free requirements.
