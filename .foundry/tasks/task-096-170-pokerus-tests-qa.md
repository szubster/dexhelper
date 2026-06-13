---
id: task-096-170-pokerus-tests-qa
type: TASK
title: QA Pokerus Parser Edge-Case Tests
status: READY
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - task-096-169-pokerus-tests-impl
jules_session_id: null
pr_number: null
parent: story-061-096-pokerus-tests
tags:
  - gen2
  - save-engine
  - pokerus
  - testing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Pokerus Parser Edge-Case Tests

## Description
Verify the implementation of Pokerus parsing edge-case tests in `src/engine/saveParser/parsers/gen2.test.ts`.

## Acceptance Criteria
- [ ] Verify that Pokerus parsing tests cover boundary values such as non-zero strain with 0 days remaining.
- [ ] Verify that the test suite runs correctly (`pnpm test`) and passes successfully.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- [ ] If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
