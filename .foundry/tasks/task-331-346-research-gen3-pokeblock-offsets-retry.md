---
id: task-331-346-research-gen3-pokeblock-offsets-retry
type: TASK
title: Research Gen 3 Pokéblock Case Offsets (Retry)
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-327-331-research-gen3-pokeblock-offsets
tags:
  - gen3
  - contests
  - pokeblocks
  - backend
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research Gen 3 Pokéblock Case Offsets (Retry)

## Overview
Before we can implement the parsing logic for extracting exact Pokéblock data from the Gen 3 save file, we need to know the exact memory offsets and data structure used for the Pokéblock Case block.

## Goals
- Identify the memory offsets for the Pokéblock Case in Gen 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- Understand the data structure for individual Pokéblocks within the case array.
- Determine how the exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the feel (smoothness) bytes are stored.

## Technical Contract
When researching and documenting these offsets, ensure the findings provide sufficient detail for the implementation phase to strictly follow The Foundry's architectural guidelines:
- **Module-Level Constants (ADR 028):** All identified memory offsets, lengths, bit locations, and shifts must be explicitly documented so they can be defined as reusable module-level constants (forbidding inline magic numbers).
- **Relative Offsets:** Ensure it is clear which Section (e.g., SaveBlock1) the offsets reside in, so that subsequent implementation can calculate relative memory offsets using the resolved section offset (e.g., `section1Offset`).
- **Graceful Failures:** The documented structures will be parsed using the `DataView` API. The implementation will be required to catch `RangeError` from out-of-bounds reads and throw a new error ("The save file is corrupted or incomplete."). Keep this in mind if there are specific edge cases or variable-length arrays.

## Acceptance Criteria
- [ ] Research and document the Gen 3 Pokéblock Case offsets and structures.
- [ ] Create a new documentation file at `.foundry/docs/knowledge_base/gen3_pokeblock_offsets.md`.
