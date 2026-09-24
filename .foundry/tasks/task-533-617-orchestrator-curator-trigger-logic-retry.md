---
id: task-533-617-orchestrator-curator-trigger-logic-retry
type: TASK
title: Orchestrator Curator Trigger Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
parent: research-533-601-investigate-curator-trigger-logic-failure
tags:
  - orchestrator
  - curator
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator Curator Trigger Logic Implementation

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to trigger the `curator` persona when a feature is considered fully "implemented" but before final archival/verification.

## Requirements
- See `research-533-601-investigate-curator-trigger-logic-failure` for implementation specifics.
- Modify `.github/scripts/foundry-heartbeat.ts` to intercept `IDEA` nodes when they transition and route them to `curator` in the `READY` state.
- Modify `.github/scripts/foundry-orchestrator.ts` to support the post-implementation Curator trigger via `promoteNodeStatus`, passing `newOwner` where appropriate in Phase 4.1, Phase 4, and Phase 4.5.
- Update mapping validation in Phase 4.8.
- Write unit tests for this new trigger logic in `.github/scripts/foundry-orchestrator.test.ts` and `.github/scripts/foundry-heartbeat.test.ts`.

## Acceptance Criteria
- [ ] Implement curator trigger logic.
