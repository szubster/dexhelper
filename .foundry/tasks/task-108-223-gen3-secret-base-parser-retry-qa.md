---
id: task-108-223-gen3-secret-base-parser-retry-qa
type: TASK
title: QA Gen 3 Secret Base Parser (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-06-24'
updated_at: '2026-06-24'
depends_on:
  - task-108-222-gen3-secret-base-parser-retry-impl
jules_session_id: null
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
  - qa
research_references:
  - research-108-221-gen3-secret-base-rangeerror
  - research-108-187-gen3-secret-base-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Parser (Retry)

## Context
Verify the implementation of the Gen 3 Secret Base Parser (Retry) task. Because save file parsing involves complex risk and data corruption handling, it requires independent QA verification. The previous implementation was rejected for missing explicit `RangeError` bounds checking and magic number violations.

## Requirements
- Verify that `task-108-222-gen3-secret-base-parser-retry-impl` exclusively uses the `DataView` API for Gen 3 secret base parsing.
- **CRITICAL:** Verify that the `DataView` parser block is wrapped in a `try...catch (e)` block that explicitly checks `e instanceof RangeError` and throws a handled error instead of crashing.
- **CRITICAL:** Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers are not allowed.
- Confirm backwards compatibility: Gen 1 and Gen 2 parsing logic must not be broken or altered.
- Review and run the unit tests provided by the coder. Add additional unit or integration tests if coverage is lacking.
- Use `pnpm run test` and ensure all tests pass.

## Acceptance Criteria
- [ ] Confirmed `DataView` API usage with explicit `RangeError` catching.
- [ ] Confirmed all magic numbers are defined as reusable module-level constants.
- [ ] Existing Gen 1/2 tests pass.
- [ ] Secret base extraction logic has adequate test coverage.

## Reminders for Personas
- **Coder/QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder/QA:** If you abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder/QA:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
