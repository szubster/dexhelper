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
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Parser (Retry)

## Context
Verify the implementation of the Gen 3 Secret Base Parser task. Because save file parsing involves complex risk and data corruption handling, it requires independent QA verification. This is a retry task focusing heavily on graceful error handling.

## Requirements
- Verify that `task-108-222-gen3-secret-base-parser-retry-impl` exclusively uses the `DataView` API for Gen 3 secret base parsing.
- Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable, descriptive constants at the module level. Inline magic numbers are forbidden.
- Verify that out-of-bounds reads explicitly throw `RangeError` (as native to `DataView`) and are caught and handled gracefully without crashing the application, following the pattern defined in `research-108-221-gen3-secret-base-rangeerror`.
- Confirm backwards compatibility: Gen 1 and Gen 2 parsing logic must not be broken or altered.
- Review and run the unit tests provided by the coder. Add additional unit or integration tests if coverage is lacking, especially for corrupted save boundaries.
- Use `pnpm run test` and ensure all tests pass.

## Acceptance Criteria
- [ ] Confirmed `DataView` API usage.
- [ ] Confirmed no magic numbers are used; all offsets/sizes are reusable constants.
- [ ] Confirmed explicit and graceful `RangeError` exception handling for out-of-bounds reads.
- [ ] Existing Gen 1/2 tests pass.
- [ ] Secret base extraction logic has adequate test coverage, including boundary failure cases.

## Reminders for Personas
- **QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **QA:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **QA:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.