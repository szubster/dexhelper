---
id: task-561-681-orchestrator-state-machine-impl
type: TASK
title: 'Implement Custom Node Lifecycle State Machine'
status: PENDING
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-12'
depends_on:
  - task-561-680-orchestrator-dag-graphology-impl
jules_session_id: null
pr_number: null
parent: story-540-561-implement-orchestrator-state-graph-engine
tags:
  - foundry
  - architecture
  - state-machine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Custom Node Lifecycle State Machine

## Overview
Based on ADR 560, implement robust custom state machine logic for Node lifecycle transitions in the Foundry orchestrator, maintaining stateless execution.

## Acceptance Criteria
- [ ] Refactor state transition logic in `packages/foundry/foundry-orchestrator.ts`.
- [ ] Implement clear state transitions (PENDING -> READY -> ACTIVE -> VERIFYING -> COMPLETED/FAILED).
- [ ] Ensure integration with the new Graphology DAG structure.
