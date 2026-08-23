---
id: task-279-304-gen3-ignore-emulator-trailing-bytes-impl
type: TASK
title: Implement Graceful Ignorance of Emulator Trailing Bytes in Gen 3 Save Files
status: FAILED
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-279-gen3-ignore-emulator-trailing-bytes
tags:
  - feature
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session timed out (>24h)'
notes: ''
---

# Task: Implement Graceful Ignorance of Emulator Trailing Bytes in Gen 3 Save Files

## Context
Per ADR 025, emulator save files (such as those from VBA-M) often contain appended trailing bytes containing RTC data (typically 44/48 bytes). These appended bytes cause size mismatch errors in our standard parsing engine. We need to implement logic to gracefully ignore these trailing bytes instead of crashing or throwing validation errors. This allows standard Gen 3 `.sav` files to be parsed regardless of the emulator used.

## Instructions
1. Locate the Gen 3 save file parsing logic (likely where the ArrayBuffer or DataView size is validated).
2. Modify the size validation to allow for files that are larger than the standard size by up to ~64 bytes (to safely cover the 44/48 byte RTC block). Alternatively, instead of strict equality on the file size, ensure that the file size is *at least* the required standard size.
3. Ensure that when parsing blocks, the offsets used do not overflow the bounds of the provided DataView/ArrayBuffer.
4. Ensure no magic numbers are used for bounds checking. Define the acceptable trailing byte limits as reusable constants at the module level.
5. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
6. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
7. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Gen 3 save file parsing engine does not throw size mismatch errors for files containing emulator trailing bytes.
- [ ] Acceptable trailing byte limits are defined as reusable constants at the module level (no inline magic numbers).
