---
id: prd-086-108-fix-orchestrator-phase-3-6
type: PRD
title: Fix orchestrator phase 3.6 for CANCELLED nodes
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-06'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: '14140594791612700438'
pr_number: null
parent: idea-086-fix-orchestrator-phase-3-6
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Fix orchestrator phase 3.6 for CANCELLED nodes

## Problem
In `foundry-orchestrator.ts` Phase 3.6, nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'` fail to trigger the parent awakening ("Impossible Loop") logic, which previously only applied to `FAILED` nodes. This causes system deadlocks.

## Solution Requirements
- Phase 3.6 logic in `foundry-orchestrator.ts` must be extended.
- It must explicitly check for nodes with `status === 'CANCELLED'`.
- It must ensure that if a node is CANCELLED due to max rejection, the parent node is properly awakened (reverted to PENDING/READY) to handle the failure and regenerate nodes.

## Acceptance Criteria
- [ ] Phase 3.6 awakening logic supports `CANCELLED` nodes.
- [ ] Parent nodes correctly awaken when child nodes are cancelled due to hitting max rejections.
- [ ] Tests verify this exact behavior in `foundry-orchestrator.test.ts`.
- [ ] epic-108-303-extend-phase-3-6-cancelled-nodes
