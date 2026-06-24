---
id: story-058-096-unown-parser-tests
type: STORY
title: Unown Form Parser Unit Tests
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-13'
depends_on: []jules_session_id: null
pr_number: null
parent: epic-037-058-unown-tracker-engine
tags:
  - testing
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Unown Form Parser Unit Tests

## Objective
Write comprehensive unit tests for the newly added Unown form parser logic.

## Context
The logic for determining the Unown form in Gen 2 uses a bitwise operation on the Attack, Defense, Speed, and Special DVs. This logic is implemented in the previous story. This story focuses solely on ensuring its correctness.

## Requirements
- Verify the exact bitwise calculation against known DV combinations for Unown forms (e.g., test cases for forms A, Z, and edge cases).
- Ensure the `unownForm` property is correctly appended to the output structure when `speciesId` is 201.
- Ensure the property is omitted or undefined for non-Unown Pokemon.

## Acceptance Criteria
- [x] Task created for implementing unit tests for the unown form parser logic.

## Generated Tasks
- [ ] `task-096-179-unown-parser-tests-impl`
- [ ] `task-096-180-unown-parser-tests-qa`
