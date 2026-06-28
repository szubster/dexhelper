---
id: task-144-232-ignore-emulator-trailing-bytes-impl
type: TASK
title: Implement Graceful Handling of Emulator Trailing Bytes in Save Files
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-144-gen3-rtc-fallback-strategy
tags:
  - feature
  - gen3
  - rtc
  - save-parsing
  - impl
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Graceful Handling of Emulator Trailing Bytes in Save Files

## Description
Based on ADR 025, Real-Time Clock (RTC) values extracted from Gen 3 `.sav` files are unreliable, and emulators like VBA-M append extra 44/48 bytes at the end of save files.
You must update the save parsing engines to gracefully ignore these trailing bytes without crashing or throwing size mismatch validations.

## Constraints & Contracts
- **Transient Failures**: If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail this task (e.g. impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes in this markdown body before submitting.
- **Save Parsing Guidelines**: When drafting or implementing blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Modify the save file parser to allow save sizes larger than strictly expected by allowing trailing bytes.
- [ ] Ensure that no errors or size mismatch validations occur when parsing saves with trailing bytes (e.g. VBA-M 44/48 bytes).
- [ ] Verify that memory constants are defined explicitly at the module level without magic numbers.
