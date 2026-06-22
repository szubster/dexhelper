---
id: task-108-212-gen3-roamer-dataview-extraction-impl
type: TASK
title: Gen 3 Roamer DataView Extraction Implementation
status: PENDING
owner_persona: coder
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Extraction Implementation

## Objective
Implement the logic to extract the Gen 3 Roamer data structure (20 bytes) from a save file using `DataView`, and parse out its IVs, HP, and Level.

## Description
This task requires reading the 20-byte `Roamer` struct from the save file data block using the native `DataView` API. Direct byte array manipulation (`Uint8Array`) must be avoided as per ADR 010.

The struct layout is:
- `0x00`: `u32` IVs bitfield
- `0x04`: `u32` Personality Value
- `0x08`: `u16` Species
- `0x0A`: `u16` Current HP
- `0x0C`: `u8` Level
- `0x0D` - `0x12`: Condition values
- `0x13`: `bool8` Active status

**Note on offsets:** The `Roamer` structure is located in `SaveBlock1`. You must determine the absolute offset dynamically or define it as a constant if handling different versions (Emerald, Ruby/Sapphire, FireRed/LeafGreen) per `.foundry/docs/knowledge_base/gen3_roamer_offsets.md`. The IV bitfield parsing logic must correctly decode the 32-bit `ivs` field into the 6 standard stat IVs (HP, Attack, Defense, Speed, Sp. Atk, Sp. Def).

**Constraint:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are forbidden.

## Acceptance Criteria
- [ ] Define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level (no inline magic numbers).
- [ ] Implement `DataView` logic to read the 20-byte Gen 3 roamer structure from the correct save offset based on version.
- [ ] Parse the 32-bit IV field into 6 distinct integer stats (HP, Atk, Def, Spe, SpA, SpD).
- [ ] Parse the Level and Current HP fields correctly.
- [ ] Include unit tests validating data extraction against known good boundary cases (e.g., all 0 IVs, all 31 IVs).
- [ ] **Coder Mandate:** If experiencing a transient failure requiring a retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [ ] **Coder Mandate:** If the task must be permanently aborted, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [ ] **Coder Mandate:** If submitting an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.