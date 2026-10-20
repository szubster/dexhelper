---
id: task-521-677-gen2-parser-refactor
type: TASK
title: Refactor Gen 2 Parser magic numbers
status: FAILED
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-10-20'
depends_on:
  - task-521-676-gen2-constants
jules_session_id: null
pr_number: null
parent: story-522-521-gen2-parser-refactor-impl
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen2
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
locks: []
---
# TASK: Refactor Gen 2 Parser magic numbers

## Context
Per ADR 028, inline magic numbers must be replaced. Replace `0x0f` with `CURRENT_BOX_NUM_MASK` and `0x00` with `GEN2_EMPTY_SLOT_00` in `src/engine/saveParser/parsers/gen2.ts`, importing these new constants from `src/engine/saveParser/parsers/gen2Constants.ts`.

## Acceptance Criteria
- [ ] Refactor `0x0f` and `0x00` in `gen2.ts` to use new constants defined in `gen2Constants.ts`.
