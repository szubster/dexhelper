---
id: task-096-157-gen2-hidden-item-parsing-impl
type: TASK
title: Gen 2 Hidden Item Event Flags Parsing Implementation
status: READY
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-096-gen2-hidden-item-parsing
tags:
  - gen2
  - save-parsing
  - feature
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 Hidden Item Event Flags Parsing Implementation

## Context
This task implements the second part of the epic `epic-037-058-hidden-items-save-parsing`. The `SaveData` interface needs to support hidden items, and the Gen 2 save parser needs to be extended to read the hidden item event flags.

## Implementation Details
1. **Update `SaveData` Interface**: Add `hiddenItemFlags?: Uint8Array;` to the `SaveData` interface in `src/engine/saveParser/parsers/common.ts` if it has not been added yet by the Gen 1 task.
2. **Research and Confirm Offset**: Extract the `wEventFlags` payload correctly for both Gold/Silver and Crystal versions. The `wEventFlags` block is 256 bytes (`0x100`) long and ends directly before `wCurBox`. The offset for Crystal is `0x2600` and for Gold/Silver is `0x2624`.
3. **Update `parseGen2`**: In `src/engine/saveParser/parsers/gen2.ts`, calculate the event flags offset. Extract the flags into a `Uint8Array` taking into consideration `view.byteOffset` to properly respect array boundaries (`new Uint8Array(view.buffer, view.byteOffset + eventFlagsOffset, 0x100)`). Map this payload to `SaveData.eventFlags` and `SaveData.hiddenItemFlags`.
4. **Update Tests**: Update the unit tests in `src/engine/saveParser/parsers/gen2.test.ts` to assert that the `eventFlags` and `hiddenItemFlags` are parsed correctly, injecting mock byte values into the dummy save buffer to test both Gold/Silver and Crystal offsets.

## Acceptance Criteria
- [ ] `SaveData` interface includes `hiddenItemFlags?: Uint8Array;`.
- [ ] `parseGen2` correctly extracts the event flags for Gen 2 (Crystal and GS) into `SaveData.hiddenItemFlags`.
- [ ] Unit tests for the Gen 2 save parser are updated to verify hidden item parsing logic.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
