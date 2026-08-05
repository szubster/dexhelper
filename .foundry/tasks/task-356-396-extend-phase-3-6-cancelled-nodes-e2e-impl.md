---
id: task-356-396-extend-phase-3-6-cancelled-nodes-e2e-impl
type: TASK
title: Implement Extend Phase 3.6 for CANCELLED nodes E2E
status: ACTIVE
owner_persona: coder
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '7758135811857039899'
pr_number: null
parent: story-340-356-extend-phase-3-6-cancelled-nodes-e2e
tags:
  - foundry
  - orchestrator
  - resilience
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Extend Phase 3.6 for CANCELLED nodes E2E

## Objective
Implement e2e/integration verification to ensure Phase 3.6 logic in `foundry-orchestrator.ts` correctly awakens parent nodes for child nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

## Requirements
- Add an end-to-end integration test or comprehensive unit test coverage verifying the entire lifecycle from rejection counting to node cancellation, and the subsequent parent state transition to PENDING/READY in `.github/scripts/foundry-orchestrator.test.ts`.

## Verification Protocol
The coder is responsible for self-verifying this task. Document the test results in the coder journal.

## Acceptance Criteria
- [ ] Add E2E tests in `.github/scripts/foundry-orchestrator.test.ts`
- [ ] Verify test passes successfully
- [ ] Document results in coder journal
