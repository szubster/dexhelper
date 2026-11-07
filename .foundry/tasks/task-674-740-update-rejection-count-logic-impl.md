---
id: task-674-740-update-rejection-count-logic-impl
type: TASK
title: Update Rejection Count Logic for System Failures
status: READY
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-02'
depends_on:
  - story-581-673-orchestrator-termination-state-parsing
jules_session_id: null
pr_number: null
parent: story-581-674-orchestrator-resurrection-logic
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Update Rejection Count Logic for System Failures

## Context
As part of the Orchestrator Resurrection Logic updates, we need to ensure that infrastructure and system crashes (`NOT_FOUND`, `INTERNAL_ERROR`) do not increment the standard domain `rejection_count`.

## Objectives
- Update the Orchestrator's resurrection loop to prevent incrementing `rejection_count` when the failure reason indicates a system or infrastructure crash (`NOT_FOUND`, `INTERNAL_ERROR`).
- Alternatively, introduce a separate system crash counter if necessary for tracking.
- Write unit tests to verify that `rejection_count` remains unaffected during system failures while properly incrementing during standard domain failures.

## Acceptance Criteria
- [ ] Orchestrator's resurrection loop is updated to bypass `rejection_count` incrementing on system/infrastructure crashes.
- [ ] Unit tests are written to assert this behavior.
