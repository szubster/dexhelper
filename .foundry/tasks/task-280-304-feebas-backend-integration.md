---
id: task-280-304-feebas-backend-integration
type: TASK
title: Integrate Feebas Logic into Gen 3 Save Parser
status: ACTIVE
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '17700366720975596178'
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

# Integrate Feebas Logic into Gen 3 Save Parser

## Objective
Update the `SaveData` interface and the `parseGen3` function to extract and calculate Feebas tile locations for RSE saves.

## Acceptance Criteria
- [x] Add `gen3FeebasTiles?: number[]` to the `SaveData` interface in `src/engine/saveParser/parsers/common.ts`.
- [x] In `src/engine/saveParser/parsers/gen3.ts`, modify `parseGen3(view, _forcedVersion)` to import `extractFeebasSeed` and `calculateFeebasTiles` from `../../gen3/feebas.ts`.
- [x] In `parseGen3`, if `_forcedVersion` is `'ruby'`, `'sapphire'`, or `'emerald'`, safely try to extract the seed and calculate the tiles, storing them in a local variable. Wrap this in a try-catch to prevent a malformed seed from failing the entire save parse.
- [x] Return the calculated tiles as `gen3FeebasTiles` in the returned `SaveData` object.
- [x] Update `src/engine/saveParser/parsers/gen3.test.ts` to include a test verifying `gen3FeebasTiles` populates correctly when valid versions are passed.
- [x] Ensure that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, preventing inline magic numbers.

## Failure Rules & Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
