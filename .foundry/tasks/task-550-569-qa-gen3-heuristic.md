---
id: task-550-569-qa-gen3-heuristic
type: TASK
title: "QA: Verify Gen 3 heuristic and tests without mock"
status: PENDING
owner_persona: "qa"
created_at: "2026-09-09"
updated_at: "2026-09-09"
depends_on:
  - task-550-568-remove-gen3-mock
jules_session_id: null
locks: []
pr_number: null
parent: story-536-550-remove-mock-and-fix-heuristic
priority: 50
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA: Verify Gen 3 heuristic and tests without mock

## Context
The `coder` was assigned to fix the `isGen3Save` heuristic in `src/engine/saveParser/utils/detection.ts` and remove the `isGen3Spy` mock from `src/engine/saveParser/index.test.ts`. This QA task verifies that the implementation correctly identifies Gen 3 saves without unhandled errors and that the test suite passes with the real function.

## Requirements
- Verify that `isGen3Save` in `src/engine/saveParser/utils/detection.ts` gracefully handles `RangeError` and correctly implements the Gen 3 structural signature checks.
- Verify that the `isGen3Spy` mock is fully removed from `src/engine/saveParser/index.test.ts`.
- Run `pnpm test` and ensure all tests, particularly those testing Gen 3 fallback behavior and parsing, pass with the real implementation.

## Acceptance Criteria
- [ ] Code review confirms the heuristic fixes and mock removal.
- [ ] Test suite passes successfully (`pnpm test`).
