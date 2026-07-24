---
id: epic-108-340-extend-phase-3-6-cancelled-nodes-retry
type: EPIC
title: Extend Phase 3.6 for CANCELLED nodes (Retry)
status: READY
owner_persona: story_owner
created_at: '2026-07-24'
updated_at: '2026-07-24'
depends_on:
  - research-108-339-investigate-orchestrator-phase-3-6-failure
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

# Extend Phase 3.6 for CANCELLED nodes (Retry)

## Objective
Extend Phase 3.6 logic in `foundry-orchestrator.ts` to properly handle nodes transitioning to `CANCELLED` status due to max rejections, taking into account the learnings from the previous research.

## Context
In `foundry-orchestrator.ts` Phase 3.6, nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'` fail to trigger the parent awakening ("Impossible Loop") logic. This causes system deadlocks. The parent node needs to be properly awakened (reverted to PENDING/READY) to handle the failure and regenerate nodes.

## Requirements
- Review the findings in the prerequisite research node.
- Implement the required changes in `foundry-orchestrator.ts` Phase 3.6.
- Add an explicit check for nodes with `status === 'CANCELLED'` and `rejection_reason === 'Max rejection count reached'`.
- Ensure the parent node is properly awakened (reverted to PENDING/READY) for these cancelled nodes.
- Update tests in `foundry-orchestrator.test.ts` to verify this exact behavior.

## Acceptance Criteria
- [ ] Break down into Stories
