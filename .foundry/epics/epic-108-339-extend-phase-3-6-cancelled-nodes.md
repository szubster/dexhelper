---
id: epic-108-339-extend-phase-3-6-cancelled-nodes
type: EPIC
title: Extend Phase 3.6 for CANCELLED nodes
status: PENDING
owner_persona: story_owner
created_at: '2026-07-23'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-086-108-fix-orchestrator-phase-3-6
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extend Phase 3.6 for CANCELLED nodes

## Objective
Extend Phase 3.6 logic in `foundry-orchestrator.ts` to properly handle nodes transitioning to `CANCELLED` status due to max rejections.

## Context
In `foundry-orchestrator.ts` Phase 3.6, nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'` fail to trigger the parent awakening ("Impossible Loop") logic, which previously only applied to `FAILED` nodes. This causes system deadlocks. The parent node needs to be properly awakened (reverted to PENDING/READY) to handle the failure and regenerate nodes.

## Requirements
- Identify where Phase 3.6 logic is located in `foundry-orchestrator.ts`.
- Add an explicit check for nodes with `status === 'CANCELLED'` and `rejection_reason === 'Max rejection count reached'`.
- Ensure the parent node is properly awakened (reverted to PENDING/READY) for these cancelled nodes.
- Update tests in `foundry-orchestrator.test.ts` to verify this exact behavior.
- Ensure the epic includes a final STORY dedicated to Integration and E2E Verification.

## Acceptance Criteria
- [ ] Break down into Stories
- [ ] Create a final STORY dedicated to Integration and E2E Verification
