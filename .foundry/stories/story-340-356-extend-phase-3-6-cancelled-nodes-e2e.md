---
id: story-340-356-extend-phase-3-6-cancelled-nodes-e2e
type: STORY
title: Extend Phase 3.6 for CANCELLED nodes (E2E Verification)
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on:
  - story-340-346-extend-phase-3-6-cancelled-nodes
jules_session_id: null
pr_number: null
parent: epic-108-340-extend-phase-3-6-cancelled-nodes-retry
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

# Extend Phase 3.6 for CANCELLED nodes (E2E Verification)

## Objective
Implement e2e/integration verification to ensure Phase 3.6 logic in `foundry-orchestrator.ts` correctly awakens parent nodes for child nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

## Requirements
- Add an end-to-end integration test or comprehensive unit test coverage verifying the entire lifecycle from rejection counting to node cancellation, and the subsequent parent state transition to PENDING/READY.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] .foundry/tasks/task-356-396-extend-phase-3-6-cancelled-nodes-e2e-impl.md
