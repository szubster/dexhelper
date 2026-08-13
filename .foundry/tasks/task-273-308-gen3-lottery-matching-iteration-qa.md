---
id: task-273-308-gen3-lottery-matching-iteration-qa
type: TASK
title: Gen3 Lottery Matching Iteration QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-08-13'
depends_on:
  - task-273-307-gen3-lottery-matching-iteration-impl
jules_session_id: null
pr_number: null
parent: story-133-273-gen3-lottery-matching-algorithm
tags:
  - feature
  - gen3
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Matching Iteration QA

## Goal
Verify the Party and PC Box iteration logic and integration with the lottery matching algorithm.

## Requirements
- Validate that the implementation correctly gathers all Pokémon from the Party and PC Boxes.
- Ensure that the 16-bit OT IDs are extracted accurately.
- Verify that module-level constants are used for all memory offsets and magic numbers are completely avoided (per ADR 028).
- Confirm that the edge cases in Party/Box structures (e.g. empty boxes, corrupted data handling if applicable) are correctly handled and do not crash the application.

## Contracts & Architecture Instructions
- **QA Contract**: You are responsible for ensuring the coder correctly implemented the requirements, verifying it manually and verifying all tests pass.
- **Failures**:
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify that all unit tests added by the coder pass successfully.
- [x] Ensure that no magic numbers are used in the memory parsing logic (ADR 028 compliance).
- [x] Verify the correctness of the best match selection by manually feeding test case data.
