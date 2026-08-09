---
id: task-362-407-gen3-trade-extraction-impl
type: TASK
title: Implement Gen 3 NPC Trade Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '84465899427133993'
pr_number: null
parent: story-349-362-gen3-trade-extraction
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement Gen 3 NPC Trade Extraction

## Objective
Implement extraction of in-game NPC trade completion flags from Generation 3 (RSE, FRLG) save files.

## Constraints & Requirements
- Strictly adhere to Section 13 of `.foundry/docs/schema.md`.
- All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
- No magic numbers are permitted in parsing functions.
- Use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of absolute hardcoded offsets.
- Explicitly map specific bit offsets corresponding to target events.
- MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
- Extract Gen 3 NPC trade flags for all core versions (RSE, FRLG).
- Populate the `npcTradeFlags` field in `SaveData`.

## Acceptance Criteria
- [ ] Implement extraction logic following all constraints above.
- [ ] Populate `npcTradeFlags` correctly.
- [ ] Write unit tests to cover success and `RangeError` cases.
