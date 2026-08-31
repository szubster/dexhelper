---
id: task-478-508-gen2-ruins-of-alph-qa
type: TASK
title: QA Gen 2 Ruins of Alph Puzzle Parsing
status: READY
owner_persona: qa
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - task-478-507-gen2-ruins-of-alph-parsing-logic
jules_session_id: null
parent: story-338-478-gen2-ruins-of-alph-puzzle-flags
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
---

# QA Gen 2 Ruins of Alph Puzzle Parsing

## Context
QA needs to verify the implementation of the Ruins of Alph puzzle event flag parsing for Gen 2 saves, ensuring it adheres to our save parsing constraints.

## Technical Requirements
- Verify that module-level constants are used for all offsets and bit masks (no magic numbers).
- Verify that `RangeError` is caught and rethrown as "The save file is corrupted or incomplete.".
- Verify that the specific bit offsets are explicitly mapped rather than just returning a raw array.
- Run `pnpm lint && pnpm test` to ensure tests are passing and correctly cover the new logic.

## Acceptance Criteria
- [ ] Verify no magic numbers are used in parsing.
- [ ] Verify `RangeError` handling is present.
- [ ] Verify bitwise mappings are explicitly defined.
- [ ] Verify unit tests pass and adequately cover the logic.
