---
id: task-572-594-lefthook-e2e-qa
type: TASK
title: QA Verification for Lefthook Schema Validation E2E
status: PENDING
owner_persona: qa
created_at: '2026-09-18'
updated_at: '2026-09-19'
depends_on:
  - task-572-593-lefthook-e2e-coder
jules_session_id: null
parent: story-554-572-lefthook-e2e
tags:
  - e2e
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification for Lefthook Schema Validation E2E

## Objective
Verify the newly created bash script `tests/integration/lefthook_schema_validation.sh` functions as intended without flaky behavior.

## Context
A test script has been created to ensure that Lefthook properly aborts when attempting to commit malformed Foundry node files.

## Requirements
1. Verify the E2E script runs successfully with bash.
2. Verify the assertions are correct (e.g., proper error codes returned on invalid input).
3. Ensure no workspace pollution occurs (temporary test files correctly cleaned up).

## Acceptance Criteria
- [ ] The newly created `lefthook_schema_validation.spec.ts` passes the bash execution smoothly.
