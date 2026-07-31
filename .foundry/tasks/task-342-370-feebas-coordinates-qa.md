---
id: task-342-370-feebas-coordinates-qa
type: TASK
title: QA - Map Feebas IDs to Coordinates
status: COMPLETED
owner_persona: qa
created_at: '2026-07-31'
updated_at: '2026-07-31'
depends_on:
  - task-342-369-feebas-coordinates-impl
jules_session_id: null
pr_number: null
parent: story-058-342-feebas-backend-integration-retry
tags:
  - gen3
  - backend
  - save-parsing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Map Feebas IDs to Coordinates

## Objective
Verify the `coder` correctly updated `gen3FeebasTiles` to be an array of 2D coordinates `[number, number][]` and successfully integrated `mapSpotIdsToCoordinates` into the parsing logic.

## Acceptance Criteria
- [x] Review PR/code to ensure `gen3FeebasTiles` in `SaveData` is correctly typed as `[number, number][]` in `src/engine/saveParser/parsers/common.ts`.
- [x] Verify that the extraction logic correctly calls `mapSpotIdsToCoordinates` before populating `gen3FeebasTiles` in the returned `SaveData` object.
- [x] Verify the coder strictly adhered to the "Save File Parsing & Extraction Guidelines" in `.foundry/docs/schema.md` (Section 13).
- [x] Verify corresponding tests pass and specifically check that the returned tiles are coordinates and not scalar IDs.

## Failure Rules & Instructions
- If the coder's implementation is flawed, reject the task by setting the coder task's frontmatter to `status: FAILED` with a detailed `rejection_reason`.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
