---
id: task-533-677-savedatareader-e2e-tests
type: TASK
title: Write E2E Tests for SaveDataReader
status: FAILED
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: null
parent: story-521-533-savedatareader-e2e
tags:
  - testing
  - e2e
  - save-parser
rejection_count: 1
rejection_reason: 'The E2E tests only test SaveDataReader methods directly with dummy buffers and do not validate the full application integration flow.'
locks: []
---

# Task: Write E2E Tests for SaveDataReader

## Description
Write End-to-End (E2E) tests for the `SaveDataReader` to ensure it works properly within the full application flow when reading save data.

## Acceptance Criteria
- [ ] Create E2E test cases for `SaveDataReader` integration.
- [ ] Verify core engine workflow execution against dummy/stubbed buffer files in E2E.
- [ ] Ensure all new E2E tests pass successfully (`pnpm test:e2e`).

### Auditor Rejection
The E2E tests in `tests/e2e/save-data-reader.spec.ts` are merely unit tests executing within the Playwright test runner. They directly instantiate `SaveDataReader` with a dummy `ArrayBuffer` and check its return values. This violates the Acceptance Criteria, which strictly require validating the "full application integration flow" for reading save data in E2E. You must implement true E2E UI tests that upload a save file through the application UI and verify the resulting state in the browser.
