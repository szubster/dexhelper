---
id: task-332-368-gen3-pokeblock-extraction-qa
type: TASK
title: QA Verification for Gen 3 Pokéblock Case Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on:
  - task-332-367-gen3-pokeblock-extraction-impl
jules_session_id: '9725628562564447045'
pr_number: null
parent: story-327-332-implement-gen3-pokeblock-parsing
tags:
  - qa
  - gen3
  - contests
  - pokeblocks
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Verification for Gen 3 Pokéblock Case Parsing

## Overview
Verify the implementation of the Gen 3 Pokéblock Case parsing logic.

## Acceptance Criteria
- [ ] Verify that the Pokéblock array is correctly extracted from `SaveBlock1` (Offsets: Emerald `0x0848`, RS `0x07F8`).
- [ ] Verify that the 8-byte structure is parsed correctly for all properties (color, flavors, feel).
- [ ] Verify strict adherence to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md` (e.g., module-level constants, no magic numbers, relative offsets, and catching `RangeError` with the correct error message).
- [ ] Verify tests exist and pass for extracting Pokéblocks.
