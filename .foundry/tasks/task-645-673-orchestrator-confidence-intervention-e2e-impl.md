---
id: task-645-673-orchestrator-confidence-intervention-e2e-impl
type: TASK
title: Implement Confidence Metrics Intervention E2E
status: READY
owner_persona: coder
created_at: '2026-10-08T12:00:00Z'
updated_at: '2026-10-08T12:00:00Z'
depends_on: []
parent: story-570-645-orchestrator-confidence-intervention-e2e
jules_session_id: null
rejection_count: 0
rejection_reason: ""
tags:
  - orchestrator
  - e2e
  - vitest
priority: 60
---

# Implement Confidence Metrics Intervention E2E

## Context
E2E Verification for orchestrator interventions on low confidence metrics in the Foundry orchestrator script.

## Requirements
- Write integration tests for `.github/scripts/foundry-orchestrator.test.ts` using vitest.
- Verify that a node with `confidence_score` < 70 does not bypass the review and correctly spawns a QA/Auditor task (i.e., status remains READY or similar appropriately pending state and owner_persona changes to QA/auditor).
- Ensure no core functionality is broken in the Orchestrator.

## Acceptance Criteria
- [ ] Integration tests implemented in `.github/scripts/foundry-orchestrator.test.ts`
- [ ] Tests verify that nodes with `confidence_score` < 70 spawn QA/Auditor tasks
- [ ] `pnpm test` passes in `.github/scripts`
