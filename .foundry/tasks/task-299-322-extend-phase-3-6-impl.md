---
id: task-299-322-extend-phase-3-6-impl
type: TASK
title: Extend Phase 3.6 for CANCELLED nodes
status: READY
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-303-299-extend-phase-3-6-cancelled-nodes
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
- [ ] Phase 3.6 condition in `foundry-orchestrator.ts` checks for `CANCELLED` status and `Max rejection count reached` reason.
- [ ] Parent nodes of such cancelled nodes are correctly awakened.
- [ ] Tests in `foundry-orchestrator.test.ts` are updated to cover this new case.

### REMINDER FOR CODER
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
