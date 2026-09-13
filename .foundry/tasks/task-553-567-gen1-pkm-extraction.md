---
id: task-553-567-gen1-pkm-extraction
type: TASK
title: Gen 1 PKM Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
parent: story-530-553-gen1-gen2-pkm-extraction
tags:
  - data
  - gen1
locks: []
rejection_reason: ''
---

# Task: Gen 1 PKM Extraction Logic

## Overview
Implement the core logic to extract individual Pokémon data from a Gen 1 save file and format it into a `.pkm` file representation.

## Context
Gen 1 `.pkm` files contain 44 bytes of data per Pokémon, starting from specific memory offsets in the party or PC boxes. According to the schema, module-level constants must be used.

## Acceptance Criteria
- [ ] Coder: Implement `extractGen1Pkm` logic, returning the 44-byte structure for a given box/party index.
- [ ] Coder: Define all offsets, lengths, and magic numbers as module-level constants.
- [ ] Coder: Ensure `RangeError` is handled according to schema guidelines.
- [ ] Coder: Write unit tests covering extraction logic.
