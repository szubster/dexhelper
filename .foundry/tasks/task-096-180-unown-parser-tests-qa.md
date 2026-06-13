---
id: task-096-180-unown-parser-tests-qa
type: TASK
title: QA - Unown Form Parser Unit Tests
status: PENDING
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - task-096-179-unown-parser-tests-impl
jules_session_id: null
pr_number: null
parent: story-058-096-unown-parser-tests
tags:
  - testing
  - gen2
  - tracking
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Unown Form Parser Unit Tests

## Context
The logic for determining the Unown form in Gen 2 uses a bitwise operation on the Attack, Defense, Speed, and Special DVs. A coder has written unit tests to verify this logic. Your job is to verify that the unit tests are comprehensive and correct.

## Instructions for QA
1. Ensure the unit tests actually run and pass (e.g. `pnpm test`).
2. Review the unit tests to ensure they cover the edge cases of Unown form calculation (specifically checking extreme DV combinations that yield Form A and Form Z).
3. Confirm there is a test guaranteeing `unownForm` is appended when `speciesId === 201`.
4. Confirm there is a test guaranteeing `unownForm` is omitted/undefined when `speciesId !== 201`.

## Contract Reminders
- If you reject the implementation, you MUST update the target implementation task's YAML frontmatter to `status: FAILED`, provide a `rejection_reason`, increment `rejection_count`, and leave its acceptance criteria unchecked. DO NOT modify your own YAML frontmatter (this task remains `ACTIVE`). Document the failure in your own markdown body.
- If you must abort or permanently fail your own QA task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verified that tests for the exact bitwise calculation against known DV combinations for Unown forms (A, Z, etc.) exist and pass.
- [ ] Verified tests assert that `unownForm` is appended to the output structure when `speciesId` is 201.
- [ ] Verified tests assert that `unownForm` is omitted or undefined for non-Unown Pokemon.
