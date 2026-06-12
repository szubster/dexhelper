---
id: task-067-117-clear-rejection-reason-in-orchestrator
type: TASK
title: Clear Rejection Reason in Orchestrator
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-04'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-067-clear-rejection-reason
tags:
  - foundry
  - lifecycle
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Clear Rejection Reason in Orchestrator

## Description
Modifies the DAG Orchestrator (`foundry-orchestrator.ts`) to automatically clear the `rejection_reason` property whenever it successfully transitions a node into a valid operating state (`ACTIVE`, `READY`, `PENDING`, `VERIFYING`, or `COMPLETED`).

This mitigates a bug where stale metadata from a previously failed retry causes subsequent non-related errors to be miscategorized as Impossible Loops (since `rejection_reason` wasn't blanked out on recovery).

## Acceptance Criteria
- [x] Modify `promoteNodeStatus` in `foundry-orchestrator.ts` to clear `rejection_reason` on valid state transitions.
- [x] Write an automated test in `foundry-orchestrator.test.ts` to ensure `rejection_reason` is correctly cleared.
