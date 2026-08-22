---
id: task-409-440-orchestrator-archive-bypass-e2e-impl
type: TASK
title: Implement Orchestrator Archive Bypass E2E Verification
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '4979322748811404169'
pr_number: null
parent: story-405-409-orchestrator-archive-bypass-e2e
tags:
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Orchestrator Archive Bypass E2E Verification

## Objective
Write an E2E test in `.github/scripts/foundry-orchestrator.test.ts` to verify that the orchestrator skips `archive/` directories when discovering nodes.

## Requirements
1. The test should mock a directory structure containing active nodes (e.g. `epics/`, `tasks/`) and archived nodes (e.g. `archive/tasks/`).
2. Run the orchestrator script using a mocked environment (or test utils) and observe the matrix output.
3. Assert that the nodes residing in the `archive/` directory are entirely omitted from the orchestrator output, while un-archived, ready nodes are present.

## Acceptance Criteria
- [ ] Add an E2E test suite or a new test case in `.github/scripts/foundry-orchestrator.test.ts` that specifically validates the skip logic for the `archive/` directory.
- [ ] Ensure the tests pass locally.
