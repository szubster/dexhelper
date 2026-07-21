---
id: task-299-323-extend-phase-3-6-qa
type: TASK
title: QA Extend Phase 3.6 for CANCELLED nodes
status: COMPLETED
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-17'
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
# QA Extend Phase 3.6 for CANCELLED nodes

## Objective
Verify the implementation in `.github/scripts/foundry-orchestrator.ts` and the associated tests correctly awaken parent nodes for nodes transitioning to `CANCELLED` status with `rejection_reason === 'Max rejection count reached'`.

## Requirements
- Review changes in `.github/scripts/foundry-orchestrator.ts`.
- Review updated tests in `.github/scripts/foundry-orchestrator.test.ts`.
- Run the test suite: `cd .github/scripts && pnpm install && npx vitest`.

## Acceptance Criteria
- [x] Code modifications accurately implement the requirements.
- [x] All unit tests pass, explicitly covering the new behaviour.
- [x] The change does not break existing test cases.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
