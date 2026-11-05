---
id: task-521-742-gen3-submodules-tests-impl-retry-v2
type: TASK
title: Update Gen 3 Submodule Parser Tests (Retry v2)
status: READY
owner_persona: coder
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on:
  - task-521-741-gen3-submodules-logic-impl-retry-v2
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

# Update Gen 3 Submodule Parser Tests (Retry v2)

## Context & Problem Statement
After refactoring the Gen 3 submodule parser logic, we must ensure all associated unit and integration tests are passing and properly aligned with the relative offset mapping architecture. This is a retry of `task-521-706-gen3-submodules-tests-impl-retry`.

## Acceptance Criteria
- [ ] Update tests in `parser.test.ts` or related files for all modified Gen 3 submodules.
- [ ] Add specific test cases to verify out-of-bounds `RangeError` handling.
