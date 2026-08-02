---
id: story-340-346-extend-phase-3-6-cancelled-nodes
type: STORY
title: Extend Phase 3.6 for CANCELLED nodes
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-25'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-108-340-extend-phase-3-6-cancelled-nodes-retry
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
Update `.github/scripts/foundry-orchestrator.ts` Phase 3.6 logic to correctly awaken parent nodes for nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

## Requirements
- Locate the Phase 3.6 impossible loop checks in `.github/scripts/foundry-orchestrator.ts`.
- Ensure the condition includes `node.frontmatter.status === 'CANCELLED'`.
- Ensure the condition `node.frontmatter.rejection_reason === 'Max rejection count reached'` is properly checked for parent awakening.
- Update tests in `.github/scripts/foundry-orchestrator.test.ts` to assert that parent nodes are awakened when child nodes are cancelled due to max rejections.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-346-388-extend-phase-3-6-cancelled-nodes-passthrough

### Passthrough Validation Note
The required changes and tests for this story have already been implemented in `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-orchestrator.test.ts` during a previous attempt. The tech lead should create the required passthrough tasks.
