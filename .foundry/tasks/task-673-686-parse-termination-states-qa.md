---
id: task-673-686-parse-termination-states-qa
type: TASK
title: 'QA: Verify Orchestrator Termination State Parsing'
status: READY
owner_persona: qa
created_at: '2026-10-13'
updated_at: '2026-10-31'
depends_on:
  - task-673-685-parse-termination-states-coder-tests
jules_session_id: null
parent: story-581-673-orchestrator-termination-state-parsing
tags:
  - orchestrator
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA: Verify Orchestrator Termination State Parsing

## Objective
Verify that the DAG Orchestrator correctly handles infrastructure errors versus domain rejections.

## Details
- Run the modified orchestrator against a mock workspace containing a node that has failed 3 times due to `Session terminated with state: NOT_FOUND`.
- Verify the orchestrator does NOT transition the node to `CANCELLED`.
- Verify that standard domain rejections still trigger the `CANCELLED` state upon reaching the maximum threshold.
