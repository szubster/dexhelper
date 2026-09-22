---
id: task-537-538-acceptance-criteria-adr007-coder
type: TASK
title: Implement E2E Tests for ADR 007 Rule (Unchecked Boxes)
status: COMPLETED
owner_persona: coder
created_at: '2026-09-17T22:13:54Z'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-534-537-acceptance-criteria-integration-e2e
tags:
  - foundry
  - testing
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement E2E Tests for ADR 007 Rule (Unchecked Boxes)

## Context
We need to ensure that the newly updated Acceptance Criteria architecture correctly enforces ADR 007, which mandates that nodes cannot be completed if they have unchecked Acceptance Criteria checkboxes.

## Requirements
- Write integration/e2e tests in `.github/scripts/foundry-orchestrator.test.ts` (or relevant test files) to explicitly verify that leaf tasks with unchecked boxes trigger the required failures/rejections (ADR 007).
- Use `vitest` to run the tests and verify behavior.

## Acceptance Criteria
- [x] Implement E2E tests validating Acceptance Criteria checkboxes failure modes.
- [x] Ensure tests pass successfully.
