---
id: task-280-325-feebas-backend-integration-retry-impl
type: TASK
title: Retry Integrate Feebas Logic into Gen 3 Save Parser
status: COMPLETED
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-280-feebas-backend-integration
tags:
  - gen3
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Retry Integrate Feebas Logic into Gen 3 Save Parser

## Objective
Update the `SaveData` interface and the parsing logic to extract and calculate Feebas tile locations for RSE saves, ensuring correct usage of relative offsets based on `section1Offset`.

## Acceptance Criteria
- [x] Add `gen3FeebasTiles?: number[]` to the `SaveData` interface.
- [x] Modify the parsing logic to safely extract the seed and calculate the tiles for 'ruby', 'sapphire', or 'emerald' versions. Wrap this in a try-catch to prevent a malformed seed from failing the entire save parse.
- [x] Ensure the extraction function receives the `section1Offset` from the parsing engine to correctly calculate the seed position relative to the active save block, resolving the A/B bank issue.
- [x] Return the calculated tiles as `gen3FeebasTiles` in the returned `SaveData` object.
- [x] Update the corresponding tests to verify `gen3FeebasTiles` populates correctly when valid versions are passed.
- [x] Explicitly define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level, forbidding inline magic numbers.
- [x] Explicitly use the resolved section offset (`section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.

## Failure Rules & Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
