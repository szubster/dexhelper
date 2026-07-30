---
id: task-332-367-gen3-pokeblock-extraction-impl
type: TASK
title: Implement Gen 3 Pokéblock Case Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-07-30'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: '14349731040270638568'
pr_number: null
parent: story-327-332-implement-gen3-pokeblock-parsing
tags:
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

# Implement Gen 3 Pokéblock Case Parsing

## Overview
Implement the extraction logic for Pokéblocks from Gen 3 save files in the backend data engine.
Reference: `.foundry/docs/knowledge_base/gen3_pokeblock_offsets.md`

## Acceptance Criteria
- [x] Implement parsing logic for the Pokéblock array in SaveBlock1.
  - Emerald: Offset `0x0848`
  - Ruby / Sapphire: Offset `0x07F8`
- [x] Implement parsing for the exact 8-byte structure of individual Pokéblocks:
  - `color` (Byte 0)
  - `spicy` (Byte 1)
  - `dry` (Byte 2)
  - `sweet` (Byte 3)
  - `bitter` (Byte 4)
  - `sour` (Byte 5)
  - `feel` (Byte 6)
- [x] Explicitly map the flavors correctly based on the docs.
- [x] Strictly adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
  - Use module-level constants.
  - No magic numbers.
  - Use relative offsets (Gen 3).
  - Catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
