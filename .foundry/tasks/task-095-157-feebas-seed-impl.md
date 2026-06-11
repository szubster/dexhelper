---
id: task-095-157-feebas-seed-impl
type: TASK
title: Implement Feebas Seed Extraction
status: FAILED
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '11183359486521976627'
pr_number: null
parent: story-058-095-feebas-seed-extraction
tags:
  - gen3
  - backend
  - save-parsing
rejection_count: 1
rejection_reason: >-
  The implementation is completely missing. src/engine/gen3/feebas.ts does not
  exist.
notes: ''
---

# Implement Feebas Seed Extraction

## Objective
Implement a utility function to extract the 16-bit Feebas seed from Gen 3 save files (Ruby, Sapphire, Emerald) using the native `DataView` API.

## Architecture & Constraints (ADR 010)
- You **MUST** exclusively use the native `DataView` API (e.g. `getUint16`) to read the seed value.
- You **MUST NOT** use raw `Uint8Array` manipulations.
- You **MUST** rely on `DataView` to throw a `RangeError` on out-of-bounds reads.
- You **MUST** explicitly catch `RangeError` and throw a new Error with the message `"The save file is corrupted or incomplete."`

## Technical Blueprint

1. Create `src/engine/gen3/feebas.ts` (and its test file `feebas.test.ts`). Note that `src/engine/gen3` might not exist yet.
2. Implement `extractFeebasSeed(saveData: DataView, gameVersion: GameVersion)` function.
3. The function must extract the 16-bit seed at specific offsets within `SaveBlock1`:
    - `0x2DD6` for Ruby/Sapphire
    - `0x2E66` for Emerald
4. Add unit tests for `extractFeebasSeed` verifying:
    - Correct extraction for Ruby/Sapphire.
    - Correct extraction for Emerald.
    - Graceful handling of corrupted/truncated saves (verifying the `RangeError` is caught and re-thrown as the corrupted save error).

## Developer Reminders
- If you encounter a permanent failure or need to abort, you **MUST** update this node's YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- If you submit an Empty PR for a completed task (e.g., the code already existed), you **MUST** check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `src/engine/gen3/feebas.ts` exists and implements `extractFeebasSeed`.
- [ ] Uses `DataView` API with explicit `RangeError` bounds-checking catch logic.
- [ ] Handles version-specific offsets correctly.
- [ ] Unit tests added and passing.
