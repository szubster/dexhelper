---
id: task-279-305-gen3-ignore-emulator-trailing-bytes-qa
type: TASK
title: QA Gen 3 Graceful Ignorance of Emulator Trailing Bytes
status: PENDING
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on:
  - task-279-304-gen3-ignore-emulator-trailing-bytes-impl
jules_session_id: null
pr_number: null
parent: story-081-279-gen3-ignore-emulator-trailing-bytes
tags:
  - feature
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Graceful Ignorance of Emulator Trailing Bytes

## Context
The Coder has implemented logic to gracefully ignore emulator trailing bytes (e.g. from VBA-M appending RTC data) during Gen 3 save file parsing, as dictated by ADR 025. You are responsible for verifying that this logic works as expected and does not break existing parsing behavior.

## Instructions
1. Verify that the Coder's implementation in the Gen 3 save file parsing engine correctly handles save files with appended trailing bytes.
2. Verify that there are no magic numbers used for bounds checking; instead, they must be defined as reusable constants at the module level.
3. Review the tests (or add them if necessary) to ensure both standard size saves and saves with trailing bytes are handled without throwing size mismatch errors.
4. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
5. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
6. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Confirmed that standard Gen 3 save files parse successfully.
- [ ] Confirmed that Gen 3 save files with trailing bytes (up to the acceptable limit) parse successfully without size mismatch errors.
- [ ] Confirmed that trailing byte limits are defined as reusable module-level constants.
