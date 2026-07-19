---
id: task-280-326-feebas-backend-integration-retry-qa
type: TASK
title: QA - Retry Feebas Backend Integration
status: COMPLETED
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-19'
depends_on:
  - task-280-325-feebas-backend-integration-retry-impl
jules_session_id: null
pr_number: null
parent: story-058-280-feebas-backend-integration
tags:
  - gen3
  - backend
  - save-parsing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Retry Feebas Backend Integration

## Objective
Verify the `coder` correctly implemented the Feebas tile extraction logic using relative offsets from `section1Offset` in the parsing engine.

## Acceptance Criteria
- [x] Review PR/code for modifications to ensure `gen3FeebasTiles` is correctly populated in the `SaveData` interface.
- [x] Verify that the extraction function correctly calculates the memory offset relative to `section1Offset` rather than using absolute hardcoded offsets.
- [x] Verify that the parsing logic handles RSE save files correctly and gracefully ignores versions without a Feebas seed.
- [x] Verify corresponding tests pass and cover the integration.
- [x] Ensure that memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, preventing inline magic numbers.

## Failure Rules & Instructions
- If the coder's implementation is flawed (e.g. using absolute offsets instead of relative to `section1Offset`), reject the task by setting the coder task's frontmatter to `status: FAILED` with a detailed `rejection_reason`.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
