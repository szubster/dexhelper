---
id: task-151-224-gen2-friendship-impl
type: TASK
title: Gen 2 Friendship Implementation
status: PENDING
owner_persona: coder
created_at: 2026-06-27T00:00:00.000Z
updated_at: 2026-06-27T00:00:00.000Z
depends_on: []
jules_session_id: null
pr_number: null
parent: story-094-151-gen2-friendship-extraction
tags:
  - gen2
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Friendship Implementation

## Context
Extract Friendship value for Gen 2 Pokémon in both Party and PC boxes.

## Scope
- Friendship is already parsed via `view.getUint8(offset + 27)` but ensure it is properly exposed/tested.
- Add unit tests for the extracted friendship value in `src/engine/saveParser/parsers/gen2.test.ts`.
- Ensure all memory offsets are defined as reusable constants at the module level.
- Reminder: Check off acceptance criteria before submitting an empty PR.
- Reminder: Change status to FAILED or CANCELLED on failure.

## Acceptance Criteria
- [ ] Export friendship at offset 27.
- [ ] Add unit tests for the extracted value in gen2.test.ts.
- [ ] Ensure all memory offsets are defined as reusable constants at the module level.
