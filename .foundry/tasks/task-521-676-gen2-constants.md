---
id: task-521-676-gen2-constants
type: TASK
title: Export missing Gen 2 Parser magic numbers
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-10-16'
depends_on: []
jules_session_id: '10080811793022451229'
pr_number: null
parent: story-522-521-gen2-parser-refactor-impl
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen2
locks: []
rejection_reason: ''
---
# TASK: Export missing Gen 2 Parser magic numbers

## Context
Per ADR 028, inline magic numbers must be replaced. Export `CURRENT_BOX_NUM_MASK` (0x0f) and `GEN2_EMPTY_SLOT_00` (0x00) from `src/engine/saveParser/parsers/gen2Constants.ts`.

## Acceptance Criteria
- [ ] Add and export constants `CURRENT_BOX_NUM_MASK` and `GEN2_EMPTY_SLOT_00` in `gen2Constants.ts`.
