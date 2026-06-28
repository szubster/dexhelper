---
id: task-141-210-gen3-contest-error-handling-qa
type: TASK
title: QA Gen 3 Contest Data Error Handling
status: ACTIVE
owner_persona: qa
created_at: '2026-06-20'
updated_at: '2026-06-28'
depends_on:
  - task-141-209-gen3-contest-error-handling-impl
jules_session_id: '12801622351199077331'
pr_number: null
parent: story-065-141-gen3-contest-error-handling
tags:
  - feature
  - gen3
  - contests
  - error-handling
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Contest Data Error Handling

## 1. Objective
Validate the Gen 3 contest data error handling modifications to ensure that `RangeError`s are properly caught and mapped to 'The save file is corrupted or incomplete.' validation errors.

## 2. Requirements
- Inspect the modifications in `src/engine/saveParser/parsers/gen3.ts` for `parseGen3ConditionStats` and `parseGen3Ribbons`.
- Validate that the existing logic correctly encapsulates these error-handling mechanisms.
- Run `pnpm run test -- src/engine/saveParser/parsers/gen3.test.ts` to ensure coverage for these branches.

## 3. Reminders & Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [x] Confirmed that `parseGen3ConditionStats` correctly handles `RangeError`.
- [x] Confirmed that `parseGen3Ribbons` correctly handles `RangeError`.
- [x] Confirmed that errors are handled upstream without application crashes.
