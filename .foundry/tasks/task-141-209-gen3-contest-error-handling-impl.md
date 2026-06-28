---
id: task-141-209-gen3-contest-error-handling-impl
type: TASK
title: Implement Gen 3 Contest Data Error Handling
status: READY
owner_persona: coder
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-065-141-gen3-contest-error-handling
tags:
  - feature
  - gen3
  - contests
  - error-handling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Contest Data Error Handling

## 1. Objective
Implement error handling during Gen 3 contest data extraction (condition stats and ribbons) to gracefully manage out-of-bounds reads without crashing the application.

## 2. Requirements
- Modify `parseGen3ConditionStats` in `src/engine/saveParser/parsers/gen3.ts` to wrap its parsing logic in a `try...catch` block. If a `RangeError` is caught (from `DataView` out-of-bounds), re-throw it as `new Error('The save file is corrupted or incomplete.')`.
- Modify `parseGen3Ribbons` in `src/engine/saveParser/parsers/gen3.ts` similarly to handle `RangeError`s gracefully.
- Ensure `parseGen3` bubbles these errors up as expected.

## 3. Reminders & Constraints
- Explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [x] `parseGen3ConditionStats` catches `RangeError` and throws a specific generic validation error.
- [x] `parseGen3Ribbons` catches `RangeError` and throws a specific generic validation error.
- [x] All tests for Gen 3 parsing pass.
