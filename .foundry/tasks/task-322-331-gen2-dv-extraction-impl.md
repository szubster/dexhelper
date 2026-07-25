---
id: task-322-331-gen2-dv-extraction-impl
type: TASK
title: Implement Gen 2 DV Data Extraction
status: PENDING
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-322-gen2-dv-extraction
tags:
  - dexhelper
  - generation-2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 DV Data Extraction

## 1. Objective
Extract DVs (Attack, Defense, Speed, Special) for each Pokémon from a Gen 2 save file structure to enable size calculations.

## 2. Requirements & Context
- Parse the raw binary structure of a Gen 2 Pokémon to extract the 4 DV values.
- **Architectural Scaffolding & Constraints (ADR 028 enforced):**
  - All memory offsets, lengths, bit locations, and shifts MUST be explicitly defined as reusable constants at the module level.
  - **No magic numbers** are allowed inline for memory operations.
  - The implementation MUST catch `RangeError` from out-of-bounds `DataView` reads and throw a new error with the exact message: "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement the extraction logic for Gen 2 DVs (Attack, Defense, Speed, Special).
- [ ] Define module-level constants for all memory offsets, lengths, bit locations, and shifts.
- [ ] Handle out-of-bounds reads by catching `RangeError` and throwing "The save file is corrupted or incomplete."
