---
id: task-521-579-restrict-wip-dependencies-qa
type: TASK
title: Verify orchestrator constraints for DRAFT and WIP dependencies
status: READY
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-20'
depends_on:
  - task-521-578-restrict-wip-dependencies-impl
jules_session_id: null
pr_number: null
parent: story-520-521-restrict-downstream-dependencies
tags:
  - foundry
  - orchestrator
  - wip
rejection_reason: ''
locks: []
---

# Verify orchestrator constraints for DRAFT and WIP dependencies

## Description
Verify that `.github/scripts/foundry-orchestrator.test.ts` correctly tests the new orchestrator constraints which prevent nodes from depending on `DRAFT` or `WIP` artifacts.

## Acceptance Criteria
- [ ] Add unit tests in `.github/scripts/foundry-orchestrator.test.ts` asserting that relying on `DRAFT` or `WIP` nodes triggers a warning and exits with code 1 in strict mode.
- [ ] Run `cd .github/scripts && pnpm test` to ensure all tests pass.
