---
id: task-280-305-feebas-backend-integration-qa
type: TASK
title: QA - Feebas Backend Integration
status: READY
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on:
  - task-280-304-feebas-backend-integration
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

# QA - Feebas Backend Integration

## Objective
Verify the `coder` correctly implemented the Feebas tile extraction logic in the `parseGen3` function.

## Acceptance Criteria
- [ ] Review PR/code for `src/engine/saveParser/parsers/gen3.ts` and `src/engine/saveParser/parsers/common.ts` to ensure `gen3FeebasTiles` is correctly populated.
- [ ] Verify that `parseGen3` handles RSE save files correctly and gracefully ignores FRLG save files (which do not have Feebas seeds) without crashing.
- [ ] Verify tests in `src/engine/saveParser/parsers/gen3.test.ts` pass and cover the integration.
- [ ] Ensure that memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, preventing inline magic numbers, if applicable to the coder's changes.

## Failure Rules & Instructions
- If the coder's implementation is flawed, reject the task by setting the coder task's frontmatter to `status: FAILED` with a detailed `rejection_reason`.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
