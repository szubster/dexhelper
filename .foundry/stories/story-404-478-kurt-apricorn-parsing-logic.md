---
id: story-404-478-kurt-apricorn-parsing-logic
type: STORY
title: Kurt Apricorn Parsing Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-10-07'
depends_on:
  - story-404-477-kurt-apricorn-offset-and-constants
jules_session_id: '7652295494748854738'
pr_number: null
parent: epic-338-404-kurt-apricorn-data-engine
tags:
  - gen2
  - items
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---
# Kurt Apricorn Parsing Logic

## Context
With the memory offsets and constants defined, this story implements the actual logic to extract Kurt's Apricorn crafting state from a Generation 2 save file.

## Objectives
- Implement the parsing logic to extract the byte data at the defined offsets.
- Identify the Apricorn type given to Kurt, the resulting Poké Ball, and the quantity.
- Extract the timestamp or active day flag for when the crafting was initiated.
- Throw a RangeError for any out-of-bounds reads.

## Acceptance Criteria
- [x] tech_lead: Break this STORY down into actionable TASK nodes.
- [ ] task-478-667-kurt-apricorn-types
- [ ] task-478-668-kurt-apricorn-core-logic
- [ ] task-478-669-kurt-apricorn-unit-tests
- [ ] task-478-670-kurt-apricorn-qa
