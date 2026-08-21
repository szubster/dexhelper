---
id: task-436-454-state-variables-extraction-impl
type: TASK
title: Extract State Variables and Bank Offsets
status: ACTIVE
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on:
  - task-436-452-live-memory-mapping-logic-impl
jules_session_id: '2348855960350872464'
pr_number: null
parent: story-424-436-save-block-mapping
tags:
  - emulator
  - memory
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract State Variables and Bank Offsets

## Objective
Extract key game state variables and bank offsets using relative offsets.

## Description
Implement the extraction logic for Gen 3 key game state variables (such as event flags) and bank offsets from the live memory mapping layer. You MUST strictly adhere to Section 13 of `.foundry/docs/schema.md`. Use relative offsets calculated from the resolved section offset to support the A/B bank flash memory architecture. Explicitly define all memory offsets, lengths, bit locations, shifts, and limits as reusable module-level constants. Do not use magic numbers directly in parsing functions. Add unit tests.

## Acceptance Criteria
- [ ] Extracted key state variables using relative offsets
- [ ] Avoided using magic numbers as per Section 13 guidelines
