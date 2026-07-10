---
id: task-095-158-feebas-seed-qa
type: TASK
title: QA Feebas Seed Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-12'
depends_on:
  - task-095-157-feebas-seed-impl
jules_session_id: null
pr_number: null
parent: story-058-095-feebas-seed-extraction
tags:
  - gen3
  - backend
  - save-parsing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Feebas Seed Extraction

## Objective
Verify the implementation of the 16-bit Feebas seed extraction utility from Gen 3 save files.

## Review Instructions

1. Verify `src/engine/gen3/feebas.ts` exists.
2. Verify `extractFeebasSeed(saveData: DataView, gameVersion: GameVersion)` strictly uses the `DataView` API (e.g., `getUint16`).
3. Verify that the correct version-specific offsets are used (`0x2DD6` for Ruby/Sapphire, `0x2E66` for Emerald).
4. Verify ADR 010 compliance: the code must catch `RangeError` from `DataView` operations and re-throw an Error with `"The save file is corrupted or incomplete."`
5. Verify unit tests are comprehensive and pass. Tests should cover version differences and bounds checking (truncated files).

## QA Reminders
- If the implementation fails your review, you **MUST** update this node's YAML frontmatter to `status: FAILED` and provide a clear `rejection_reason` explaining what the coder needs to fix.
- If the implementation passes and you submit an Empty PR, you **MUST** check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Code uses `DataView` and explicitly catches `RangeError` to handle out-of-bounds.
- [x] Offsets `0x2DD6` and `0x2E66` are correctly applied based on version.
- [x] Tests cover all paths and pass successfully.
