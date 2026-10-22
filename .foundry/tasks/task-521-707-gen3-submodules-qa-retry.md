---
id: task-521-707-gen3-submodules-qa-retry
type: TASK
title: QA Verification for Gen 3 Submodule Refactoring (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-10-18'
updated_at: '2026-10-22'
depends_on:
  - task-521-706-gen3-submodules-tests-impl-retry
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

# QA Verification for Gen 3 Submodule Refactoring (Retry)

## Context & Problem Statement
As per the Intelligent Verification Protocol, a QA task is needed to verify the refactored Gen 3 submodule parsers to ensure compliance with ADR 028 and that no parsing functionality is broken. This is a retry of `task-521-679-gen3-submodules-qa`.

## Acceptance Criteria
- [ ] Verify that inline magic numbers have been replaced with explicitly defined constants.
- [ ] Confirm relative offsets are used instead of absolute hardcoded offsets.
- [ ] Run `pnpm test` and verify that unit tests pass and cover `RangeError` conditions.
