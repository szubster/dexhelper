---
id: task-606-687-lint-foundry-e2e-impl
type: TASK
title: 'Implement E2E Verification of lint:foundry package script'
status: ACTIVE
owner_persona: coder
created_at: '2026-10-14T20:10:00.000Z'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: '15095662025280188488'
parent: story-553-606-package-scripts-e2e
tags:
  - foundry
  - linting
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement E2E Verification of lint:foundry package script

## Objectives
- Write an E2E verification script (e.g., a bash script in `tests/integration/`) that tests the `lint:foundry` package script.
- Ensure the script creates temporary files to simulate valid and malformed Foundry `.md` files.
- Verify that running `pnpm lint:foundry` succeeds on the valid files and fails on the malformed files.
- Integrate this script into the test suite or CI verification if applicable, or just ensure it exists as an integration test.

## Acceptance Criteria
- [x] Create an E2E verification script for `pnpm lint:foundry`.
- [x] The script verifies that validation passes correctly on valid files.
- [x] The script verifies that validation fails correctly on malformed files.
