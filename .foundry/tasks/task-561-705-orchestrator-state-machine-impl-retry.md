---
id: task-561-705-orchestrator-state-machine-impl-retry
type: TASK
title: Implement Custom Node Lifecycle State Machine (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-31'
depends_on:
  - task-561-704-orchestrator-dag-graphology-impl-retry
jules_session_id: null
pr_number: null
parent: story-540-561-implement-orchestrator-state-graph-engine
tags:
  - foundry
  - architecture
  - state-machine
rejection_count: 0
confidence_score: 100
rejection_reason: ''
notes: ''
locks: []
---

# Implement Custom Node Lifecycle State Machine (Retry)

## Overview
Based on ADR 560, implement robust custom state machine logic for Node lifecycle transitions in the Foundry orchestrator, maintaining stateless execution.

## Acceptance Criteria
- [x] Refactor state transition logic in \`packages/foundry/foundry-orchestrator.ts\`.
- [x] Implement clear state transitions (PENDING -> READY -> ACTIVE -> VERIFYING -> COMPLETED/FAILED).
- [x] Ensure integration with the new Graphology DAG structure.
