---
id: task-520-551-gen1-parser-refactor-qa
type: TASK
title: QA Gen 1 Core Parser Refactor
status: READY
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-03'
parent: story-521-520-gen1-parser-refactor-core
depends_on:
  - task-520-550-gen1-parser-refactor-impl
jules_session_id: null
rejection_reason: ''
---

# TASK: QA Gen 1 Core Parser Refactor

## Context
Verify that the refactor to remove magic numbers did not introduce regressions.

## Acceptance Criteria
- [ ] Verify that `gen1.ts` correctly uses the extracted constants.
- [ ] Verify that no regressions were introduced by running `pnpm test`.