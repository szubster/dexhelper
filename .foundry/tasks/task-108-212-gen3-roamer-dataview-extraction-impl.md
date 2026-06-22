---
id: task-108-212-gen3-roamer-dataview-extraction-impl
type: TASK
title: Implement Gen 3 Roamer DataView Extraction and Parsing
status: PENDING
owner_persona: coder
created_at: 2026-06-22
updated_at: 2026-06-22
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

# Implement Gen 3 Roamer DataView Extraction and Parsing

## Objective
Implement `DataView` logic to safely read the 20-byte Gen 3 roamer structure. Following extraction, logic should be implemented to correctly parse the IVs, HP, and Level of the roamer from this raw byte structure.

## Description
The save parser for Gen 3 needs base extraction logic to handle the roamer data structure. You must use the `DataView` API to safely extract this 20-byte structure. Then, parse the IVs, HP, and Level from it.

Refer to `.foundry/docs/knowledge_base/gen3_roamer_offsets.md` for specific struct offsets and memory locations if necessary, but strictly parse what is requested here.

## Constraints
- **MUST use `DataView` API** for safely reading the structure.
- **NO MAGIC NUMBERS**: You MUST define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` extraction logic for the 20-byte Gen 3 roamer structure.
- [ ] Implement parsing logic for IVs, HP, and Level from the structure, correctly using bitwise shifts and masks for the 32-bit IV field (each stat is 5 bits: HP at 0, Atk at 5, Def at 10, Spd at 15, SpAtk at 20, SpDef at 25).
- [ ] Handle `RangeError` on out-of-bounds reads gracefully by propagating a validation error (e.g., "Corrupted Save File").
- [ ] Define module-level constants for offsets, lengths, bit locations, and shifts (no inline magic numbers).
- [ ] Tests and lint must pass.
