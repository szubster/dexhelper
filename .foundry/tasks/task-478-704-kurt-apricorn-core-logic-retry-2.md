---
id: task-478-704-kurt-apricorn-core-logic-retry-2
type: TASK
title: Kurt Apricorn Core Parsing Logic Retry 2
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - research-478-703-investigate-kurt-apricorn-core-logic-failure
jules_session_id: null
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - items
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Kurt Apricorn Core Parsing Logic Retry 2

## Context
With the types defined, this task implements the core byte parsing logic to extract Kurt's Apricorn crafting state from the Uint8Array save file data. This is a retry of `task-478-678`.

## Objectives
- Implement extraction functions that read from the predefined Gen 2 Apricorn memory offsets.
- Throw a RangeError for any out-of-bounds reads as mandated by Section 13 of .foundry/docs/schema.md.
- Return the structured data using the types defined.

## Acceptance Criteria
- [ ] Implement the parsing logic to extract Apricorn type, resulting Poké Ball, quantity, and timestamp/active day flag.
- [ ] Implement strict bounds checking with RangeError.
