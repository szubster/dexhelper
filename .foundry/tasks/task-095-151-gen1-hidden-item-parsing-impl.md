---
id: task-095-151-gen1-hidden-item-parsing-impl
type: TASK
title: Gen 1 Hidden Item Event Flags Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-06-09'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-095-gen1-hidden-item-parsing
tags:
  - gen1
  - save-parsing
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Hidden Item Event Flags Parsing Implementation

## Context
This task implements the first part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface needs to support hidden items, and the Gen 1 save parser needs to be extended to read the hidden item event flags.

## Implementation Details
1. **Update `SaveData` Interface**: Add `hiddenItemFlags?: Uint8Array;` to the `SaveData` interface in `src/engine/saveParser/parsers/common.ts`. This ensures backward compatibility since it is an optional property.
2. **Research and Confirm Offset**: Research and confirm the exact offset for Gen 1 hidden item flags. Bulbapedia indicates it is an array around offset `0x299c` or `0x29AA` (relative to the base of Bank 1 or the main section). Note that Gen 1 events flags block size is `0x118`. You should read the right amount of bytes.
3. **Update `parseGen1`**: In `src/engine/saveParser/parsers/gen1.ts`, calculate the hidden item flags offset taking into consideration the `offsetShift` for Pokemon Yellow. Extract the flags into a `Uint8Array` and add it to the returned object.
4. **Update Tests**: Update the unit tests in `src/engine/saveParser/parsers/gen1.test.ts` to assert that the `hiddenItemFlags` are parsed correctly, injecting mock byte values into the dummy save buffer to test.

## Acceptance Criteria
- [x] `SaveData` interface includes `hiddenItemFlags?: Uint8Array;`.
- [x] `parseGen1` correctly calculates the offset (including Yellow `offsetShift`) and extracts the hidden item flags.
- [x] Unit tests for the Gen 1 save parser are updated to verify hidden item parsing logic.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
