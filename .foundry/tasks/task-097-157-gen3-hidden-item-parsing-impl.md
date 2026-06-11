---
id: task-097-157-gen3-hidden-item-parsing-impl
type: TASK
title: Gen 3 Hidden Item Event Flags Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-097-gen3-hidden-item-parsing
tags:
  - gen3
  - save-parsing
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Hidden Item Event Flags Parsing Implementation

## Context
This task implements the third part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface already supports optional `hiddenItemFlags` (`Uint8Array`). The Gen 3 save parser needs to be extended to properly parse the save sections and extract the hidden item event flags.

## Implementation Details
1. **Research Gen 3 Save Structure**: Investigate the Gen 3 save format (e.g., Ruby/Sapphire, Emerald, FireRed/LeafGreen) to determine how section data is structured, which section contains the event flags, and the exact offsets and sizes for hidden items. Note that Gen 3 uses 4KB sections.
2. **Implement Extraction**: Update the `parseGen3` function in `src/engine/saveParser/parsers/gen3.ts` to locate the correct section and extract the hidden item flags.
3. **Strict DataView Compliance**: In accordance with **ADR 010**, you MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) for all parsing logic. Do not use raw `Uint8Array` manipulations. The parser must rely on `DataView` to throw `RangeError` on out-of-bounds reads and handle these gracefully.
4. **Update Tests**: Add or update unit tests for the Gen 3 save parser to assert that the `hiddenItemFlags` are parsed correctly, injecting mock byte values into the dummy save buffer to verify extraction logic.

## Acceptance Criteria
- [x] `parseGen3` correctly parses the save file sections to locate the event flags.
- [x] `parseGen3` extracts the hidden item flags into a `Uint8Array` using exclusively the `DataView` API.
- [x] Bounds checking is handled natively by catching `DataView` `RangeError`s and propagating them appropriately.
- [x] Unit tests for the Gen 3 save parser verify hidden item parsing logic.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
