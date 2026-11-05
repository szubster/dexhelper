---
id: task-521-743-gen3-submodules-qa-retry-v2
type: TASK
title: QA Verification for Gen 3 Submodule Refactoring (Retry v2)
status: READY
owner_persona: qa
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on:
  - task-521-742-gen3-submodules-tests-impl-retry-v2
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

# QA Verification for Gen 3 Submodule Refactoring (Retry v2)

## Context & Problem Statement
As per the Intelligent Verification Protocol, a QA task is needed to verify the refactored Gen 3 submodule parsers to ensure compliance with ADR 028 and that no parsing functionality is broken. This is a retry of `task-521-707-gen3-submodules-qa-retry`.

## Acceptance Criteria
- [ ] Verify that inline magic numbers have been replaced with explicitly defined constants.
- [ ] Confirm relative offsets are used instead of absolute hardcoded offsets.
- [ ] Run `pnpm test` and verify that unit tests pass and cover `RangeError` conditions.
