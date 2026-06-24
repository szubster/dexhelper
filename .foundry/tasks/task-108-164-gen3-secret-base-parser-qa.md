---
id: task-108-164-gen3-secret-base-parser-qa
type: TASK
title: QA Gen 3 Secret Base Parser
status: ACTIVE
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-24'
depends_on:
  - task-108-163-gen3-secret-base-parser
jules_session_id: '8821443779705835786'
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
  - qa
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Parser

## Context
Verify the implementation of the Gen 3 Secret Base Parser task. Because save file parsing involves complex risk and data corruption handling, it requires independent QA verification.

## Requirements
- Verify that `task-108-163-gen3-secret-base-parser` exclusively uses the `DataView` API for Gen 3 secret base parsing.
- Verify that out-of-bounds reads throw `RangeError` and are handled gracefully without crashing the application.
- Confirm backwards compatibility: Gen 1 and Gen 2 parsing logic must not be broken or altered.
- Review and run the unit tests provided by the coder. Add additional unit or integration tests if coverage is lacking.
- Use `pnpm run test` and ensure all tests pass.

## Acceptance Criteria
- [ ] Confirmed `DataView` API usage.
- [ ] Confirmed graceful error handling for out-of-bounds reads.
- [ ] Existing Gen 1/2 tests pass.
- [ ] Secret base extraction logic has adequate test coverage.

### Rejection Note
**Validation Failed:** `task-108-163-gen3-secret-base-parser` is rejected because it fails to explicitly catch and handle `RangeError` from out-of-bounds `DataView` reads, which is a requirement defined in ADR 010.

## Reminders for Personas
- **Coder/QA:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- **Coder/QA:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### Auditor Rejection
**Validation Failed:** `task-108-163-gen3-secret-base-parser` is rejected because it fails to explicitly catch and handle `RangeError` from out-of-bounds `DataView` reads, which is a requirement defined in ADR 010.

*Note: This task is cancelled as the implementation failed permanently. Replaced by `task-108-223-gen3-secret-base-parser-retry-qa`.*
