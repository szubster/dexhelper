---
id: task-606-688-lint-foundry-e2e-qa
type: TASK
title: 'QA E2E Verification of lint:foundry package script'
status: READY
owner_persona: qa
created_at: '2026-10-14T20:10:00.000Z'
updated_at: '2026-10-19'
depends_on:
  - task-606-687-lint-foundry-e2e-impl
jules_session_id: null
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

# QA E2E Verification of lint:foundry package script

## Objectives
- Review the implemented E2E verification script for `lint:foundry` to ensure it correctly and robustly validates the `pnpm lint:foundry` command.
- Execute the E2E verification locally to confirm it passes.

## Acceptance Criteria
- [x] Verify the script creates realistic valid and invalid nodes for testing.
- [x] Confirm the script correctly captures success and failure exit codes.
- [x] Verify the script is clean and leaves no side effects after execution (e.g., using `mktemp` and cleaning up on exit).
