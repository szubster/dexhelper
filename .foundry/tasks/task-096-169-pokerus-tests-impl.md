---
id: task-096-169-pokerus-tests-impl
type: TASK
title: Implement Pokerus Parser Edge-Case Tests
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-096-pokerus-tests
tags:
  - gen2
  - save-engine
  - pokerus
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Pokerus Parser Edge-Case Tests

## Description
The Pokerus byte parsing logic in Gen 2 currently has a happy-path test in `src/engine/saveParser/parsers/gen2.test.ts`, but it needs comprehensive tests for edge cases. Implement tests that cover the boundaries of the Pokerus extraction logic (bit shifts and masking) such as:
1. When strain is non-zero but daysRemaining is zero (cured state).
2. When the parsed value contains specific bounds for `daysRemaining` and `strain`.
3. Validating the fallback handling if needed.

## Acceptance Criteria
- [ ] Add extensive Pokerus parsing tests in `src/engine/saveParser/parsers/gen2.test.ts`.
- [ ] Ensure edge cases like 0 days remaining with non-zero strain (cured state) are explicitly tested.
- [ ] Ensure all tests pass.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- [ ] If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
