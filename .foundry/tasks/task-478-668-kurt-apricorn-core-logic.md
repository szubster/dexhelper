---
id: task-478-668-kurt-apricorn-core-logic
type: TASK
title: Kurt Apricorn Core Parsing Logic
status: CANCELLED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-478-667-kurt-apricorn-types
jules_session_id: null
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - items
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-478-667-kurt-apricorn-types
notes: ''
locks: []
---
# Kurt Apricorn Core Parsing Logic

## Context
With the types defined, this task implements the core byte parsing logic to extract Kurt's Apricorn crafting state from the Uint8Array save file data.

## Objectives
- Implement extraction functions that read from the predefined Gen 2 Apricorn memory offsets.
- Throw a RangeError for any out-of-bounds reads as mandated by Section 13 ("Save File Parsing & Extraction Guidelines") of .foundry/docs/schema.md.
- Return the structured data using the types defined in the previous task.

## Acceptance Criteria
- [ ] Implement the parsing logic to extract Apricorn type, resulting Poké Ball, quantity, and timestamp/active day flag.
- [ ] Implement strict bounds checking with RangeError.
