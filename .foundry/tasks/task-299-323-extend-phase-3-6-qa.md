---
id: task-299-323-extend-phase-3-6-qa
type: TASK
title: QA Extend Phase 3.6 for CANCELLED nodes
status: PENDING
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-14'
depends_on:
  - task-299-322-extend-phase-3-6-impl
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

# QA Extend Phase 3.6 for CANCELLED nodes

## Objective
Verify the implementation in `.github/scripts/foundry-orchestrator.ts` and the associated tests correctly awaken parent nodes for nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

## Requirements
- Review changes in `.github/scripts/foundry-orchestrator.ts`.
- Review updated tests in `.github/scripts/foundry-orchestrator.test.ts`.
- Run the test suite: `cd .github/scripts && pnpm install && npx vitest`.

## Acceptance Criteria
- [ ] Code modifications accurately implement the requirements.
- [ ] All unit tests pass, explicitly covering the new behaviour.
- [ ] The change does not break existing test cases.

### REMINDER FOR QA
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
