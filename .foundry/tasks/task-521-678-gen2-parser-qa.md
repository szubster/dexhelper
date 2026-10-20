---
id: task-521-678-gen2-parser-qa
type: TASK
title: QA Refactored Gen 2 Parser magic numbers
status: READY
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-10-20'
depends_on:
  - task-521-677-gen2-parser-refactor
jules_session_id: null
pr_number: null
parent: story-522-521-gen2-parser-refactor-impl
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen2
rejection_reason: ''
locks: []
---
# TASK: QA Refactored Gen 2 Parser magic numbers

## Context
Verify the changes made in `task-521-677-gen2-parser-refactor` to ensure they comply with ADR 028 and didn't introduce any bugs.

## Acceptance Criteria
- [x] Verify `0x0f` and `0x00` in `gen2.ts` are using constants from `gen2Constants.ts`.
- [x] Verify the code functions as expected.
