---
id: task-095-167-gen1-hidden-coin-parsing-impl
type: TASK
title: Gen 1 Hidden Coin Event Flags Parsing Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '11880583601192648566'
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

# Gen 1 Hidden Coin Event Flags Parsing Implementation

## Context
This task implements the final part of the story `story-058-095-gen1-hidden-item-parsing`. The `SaveData` interface needs to support hidden coin flags, and the Gen 1 save parser needs to be extended to read them. These flags are situated around the event flags block.

## Implementation Details
1. **Update `SaveData` Interface**: Add `hiddenCoinFlags?: Uint8Array;` to the `SaveData` interface in `src/engine/saveParser/parsers/common.ts`. This ensures backward compatibility since it is an optional property.
2. **Research and Confirm Offset**: Research and confirm the exact offset for Gen 1 hidden coin flags. Look around the event flags block (e.g. `0x299C` and `0x29AA`). Be sure to read the right amount of bytes.
3. **Update `parseGen1`**: In `src/engine/saveParser/parsers/gen1.ts`, calculate the hidden coin flags offset taking into consideration the `offsetShift` for Pokemon Yellow. Extract the flags into a `Uint8Array` and add it to the returned object.
4. **Update Tests**: Update the unit tests in `src/engine/saveParser/parsers/gen1.test.ts` to assert that the `hiddenCoinFlags` are parsed correctly, injecting mock byte values into the dummy save buffer to test.

## Acceptance Criteria
- [x] `SaveData` interface includes `hiddenCoinFlags?: Uint8Array;`.
- [x] `parseGen1` correctly calculates the offset (including Yellow `offsetShift`) and extracts the hidden coin flags.
- [x] Unit tests for the Gen 1 save parser are updated to verify hidden coin parsing logic.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
