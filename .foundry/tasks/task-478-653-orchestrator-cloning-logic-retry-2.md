---
id: task-478-653-orchestrator-cloning-logic-retry-2
type: TASK
title: Implement DAG Node Cloning Logic (Retry 2)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-07'
depends_on:
  - research-478-652-investigate-cloning-failure-retry
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - generation
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
locks: []
---

# Task: Implement DAG Node Cloning Logic (Retry 2)

## Objective
Implement the logic to duplicate node structures and assign collision-free IDs within the Orchestrator DAG based on research findings.

## Scope
1. Implement logic to duplicate DAG nodes based on variant specifications.
2. Generate distinct node IDs for clones following the Parent-Linked ID Schema (`<type>-<parent_NNN>-<NNN>-<slug>`).
3. Ensure parent-child relationships and metadata dependencies are correctly remapped for clones.

## Acceptance Criteria
- [ ] Implement core node duplication function.
- [ ] Validate new node IDs against collision-free requirements.
