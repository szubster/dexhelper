---
id: task-521-706-gen3-submodules-tests-impl-retry
type: TASK
title: Update Gen 3 Submodule Parser Tests (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-22'
depends_on:
  - task-521-705-gen3-submodules-logic-impl-retry
jules_session_id: null
pr_number: null
parent: story-523-521-gen3-parsers-refactor-modules
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Update Gen 3 Submodule Parser Tests (Retry)

## Context & Problem Statement
After refactoring the Gen 3 submodule parser logic, we must ensure all associated unit and integration tests are passing and properly aligned with the relative offset mapping architecture. This is a retry of `task-521-678-gen3-submodules-tests-impl`.

## Acceptance Criteria
- [ ] Update tests in `parser.test.ts` or related files for all modified Gen 3 submodules.
- [ ] Add specific test cases to verify out-of-bounds `RangeError` handling.
