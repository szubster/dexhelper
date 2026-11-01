---
id: task-649-688-write-roamer-iv-glitch-tests
type: TASK
title: Write Roamer IV Glitch Detection Tests
status: COMPLETED
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-31'
depends_on:
  - task-649-687-define-roamer-iv-glitch-types
jules_session_id: null
pr_number: null
parent: story-398-649-gen3-roamer-iv-glitch-types-and-tests
tags:
  - gen3
  - roamer
  - iv-glitch
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Roamer IV Glitch Detection Tests

## Objective
Write failing unit tests that verify the signature of glitched and non-glitched IV spreads for Gen 3 roamers.

## Description
The Roamer IV Glitch affects Gen 3 roamers. We need to implement test cases that verify if our upcoming detection logic can properly identify a glitched IV spread versus a regular one. These tests should utilize the types defined in the previous task. The tests are expected to fail until the actual detection logic is implemented in a future story.

## Acceptance Criteria
- [x] Write unit tests verifying glitched IV spreads.
- [x] Write unit tests verifying non-glitched IV spreads.
- [x] Ensure the tests use the newly defined glitch state types.
- [x] Run `pnpm lint` and `pnpm test` to verify the new test files are syntactically valid and picked up by the test runner.
