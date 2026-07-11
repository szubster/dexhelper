---
id: task-280-305-feebas-backend-integration-qa
type: TASK
title: QA - Feebas Backend Integration
status: ACTIVE
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on:
  - task-280-304-feebas-backend-integration
jules_session_id: '15558151757017912203'
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

### QA Result: FAILED
The implementation of `extractFeebasSeed` correctly calculates the tiles but fails the architectural requirements of the Gen 3 A/B bank flash memory system. The constants `FEEBAS_SEED_OFFSET_RS` and `FEEBAS_SEED_OFFSET_EMERALD` are absolute offsets (e.g. `0x2DD6`) instead of being relative offsets from the base of SaveBlock1. Because the `extractFeebasSeed` function does not receive `section1Offset` from `parseGen3`, it always reads from bank A (`0x0000`). If the active SaveBlock1 is currently stored in Bank B (`0xE000`), it will read corrupt or outdated data.

The coder task has been transitioned to `status: FAILED` and needs to be reworked to properly pass `section1Offset` into the extraction function.
