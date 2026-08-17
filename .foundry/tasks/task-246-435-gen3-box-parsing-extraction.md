---
id: task-246-435-gen3-box-parsing-extraction
type: TASK
title: Gen 3 PC Box Binary Extraction and Decryption
status: READY
owner_persona: coder
created_at: '2026-08-17'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-108-246-gen3-box-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references:
  - research-246-244-gen3-box-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 PC Box Binary Extraction and Decryption

## Objective
Implement the low-level parsing logic to extract PC Box Pokémon data from Gen 3 save files and decrypt their internal Data blocks.

## Context
Generation 3 PC Buffer occupies sections 5-13 and holds 420 Pokémon records, each 80 bytes long. Each PC Pokémon record omits volatile battle stats but still contains an encrypted 48-byte Data block.
Reference `research-246-244-gen3-box-parsing` for exact offsets and structures.
You must use the `DataView` API (ADR 010) and define all offsets as module-level constants (ADR 028).

## Acceptance Criteria
- [ ] Implement robust `DataView` bounds-checked extraction of the 420 PC Box Pokémon records.
- [ ] Implement the XOR decryption for the 48-byte Data block of each PC Pokémon using its PV and OT ID.
- [ ] Exclude Party Pokémon or empty slots (represented by 80 bytes of 0x00) from the PC extraction payload.
- [ ] Create module-level constants for all relevant PC Box and Pokemon Data offsets.