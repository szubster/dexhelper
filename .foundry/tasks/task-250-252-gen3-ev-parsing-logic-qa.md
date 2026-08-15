---
id: task-250-252-gen3-ev-parsing-logic-qa
type: TASK
title: QA Gen 3 EV Parsing Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-15'
depends_on:
  - task-250-251-gen3-ev-parsing-logic-impl
jules_session_id: '4272093056787575257'
pr_number: null
parent: story-116-250-gen3-ev-parsing-logic
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 EV Parsing Logic

## 1. Objective
Verify the implementation of the Gen 3 EV parsing logic.

## 2. Technical Spec
- Review `src/engine/saveParser/parsers/gen3.ts` to ensure `parseGen3EVs` uses `DataView` API exclusively.
- Verify that explicit module-level constants for EV offsets (`0x00` through `0x05`) are used.
- Verify that `RangeError` is caught and translated to "The save file is corrupted or incomplete."
- Verify that unit tests in `src/engine/saveParser/parsers/gen3.test.ts` exist and pass.
- Run `pnpm lint` and `pnpm test`.

## Acceptance Criteria
- [ ] Implementation uses `DataView` API.
- [ ] Explicit module-level constants are used for offsets.
- [ ] `RangeError` is handled properly.
- [ ] Unit tests cover EV parsing and out-of-bounds reads.
- [ ] `pnpm lint` and `pnpm test` pass.
