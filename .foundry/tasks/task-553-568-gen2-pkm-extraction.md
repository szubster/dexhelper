---
id: task-553-568-gen2-pkm-extraction
type: TASK
title: Gen 2 PKM Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
parent: story-530-553-gen1-gen2-pkm-extraction
tags:
  - data
  - gen2
locks: []
rejection_reason: ''
---

# Task: Gen 2 PKM Extraction Logic

## Overview
Implement the core logic to extract individual Pokémon data from a Gen 2 save file and format it into a `.pkm` file representation.

## Context
Gen 2 `.pkm` files contain 73 bytes of data per Pokémon (includes items, etc.). Like Gen 1, data must be accurately extracted from specific offsets using constants.

## Acceptance Criteria
- [ ] Coder: Implement `extractGen2Pkm` logic, returning the 73-byte structure for a given box/party index.
- [ ] Coder: Define all offsets, lengths, and magic numbers as module-level constants.
- [ ] Coder: Ensure `RangeError` is handled according to schema guidelines.
- [ ] Coder: Write unit tests covering extraction logic.
