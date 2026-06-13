---
id: task-096-179-unown-parser-tests-impl
type: TASK
title: Implement Unown Form Parser Unit Tests
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-096-unown-parser-tests
tags:
  - testing
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Unown Form Parser Unit Tests

## Context
The logic for determining the Unown form in Gen 2 uses a bitwise operation on the Attack, Defense, Speed, and Special DVs. This logic is implemented in the `story-058-095-unown-parser-logic` story. We need to write unit tests to ensure the exact bitwise calculation works and covers all known DV combinations for Unown forms (A, Z, edge cases).

## Instructions for Coder
1. Locate the Unown parsing logic in the Gen 2 parsing utilities.
2. Write unit tests explicitly mocking different DV combinations (Attack, Defense, Speed, and Special DVs).
3. Test edge cases where the DVs generate the lowest and highest boundary values for Unown forms (Forms A and Z, assuming standard Gen 2 form math).
4. Verify that `unownForm` is properly appended to the result object only when `speciesId` is 201.
5. Verify that `unownForm` is missing/undefined when `speciesId` is NOT 201, even if the DVs would otherwise calculate a valid form.

## Contract Reminders
- If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- If you submit an empty PR for a completed task (e.g., if the tests already exist), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Unit tests written to verify the exact bitwise calculation against known DV combinations for Unown forms (A, Z, etc.).
- [x] Tests assert that `unownForm` is appended to the output structure when `speciesId` is 201.
- [x] Tests assert that `unownForm` is omitted or undefined for non-Unown Pokemon.
