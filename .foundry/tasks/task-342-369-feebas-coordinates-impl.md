---
id: task-342-369-feebas-coordinates-impl
type: TASK
title: Map Feebas IDs to Coordinates in SaveData
status: ACTIVE
owner_persona: coder
created_at: '2026-07-31'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: '14491832442511681790'
pr_number: null
parent: story-058-342-feebas-backend-integration-retry
tags:
  - gen3
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Map Feebas IDs to Coordinates in SaveData

## Objective
Update the `SaveData` schema to store Feebas tile locations as 2D coordinates `[number, number][]` instead of 1D spot IDs `number[]`, and ensure they are correctly mapped during hydration in the Gen 3 save parser.

## Acceptance Criteria
- [x] Change the type of `gen3FeebasTiles` in the `SaveData` interface (`src/engine/saveParser/parsers/common.ts`) from `number[]` to `[number, number][]`.
- [x] In `src/engine/saveParser/parsers/gen3.ts`, update the Feebas hydration logic to call `mapSpotIdsToCoordinates(gen3FeebasTiles)` and assign the result to `result.gen3FeebasTiles` when constructing the `SaveData` object.
- [x] Ensure that `extractFeebasSeed`, `calculateFeebasTiles`, and `mapSpotIdsToCoordinates` are correctly utilized and imported.
- [x] Strictly adhere to all guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
- [x] Update any corresponding tests (e.g., `gen3.test.ts`) that expect `gen3FeebasTiles` to assert the length of the array and verify it contains coordinate tuples (length 2) instead of scalar numbers.

## Failure Rules & Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
