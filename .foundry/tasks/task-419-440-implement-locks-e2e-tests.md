---
id: task-419-440-implement-locks-e2e-tests
type: TASK
title: Implement locks property Schema E2E verification
status: ACTIVE
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '2989254222463846383'
pr_number: null
parent: story-411-419-schema-resource-locking-e2e
tags:
  - orchestrator
  - architecture
  - e2e
  - integration
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement locks property Schema E2E verification

## Objective
Verify the `locks` field schema changes via integration and e2e tests.

## Details
- Update `.github/scripts/schema-fixtures.test.ts` to test for valid usage of the `locks` array property in markdown files.
- You can create valid and invalid markdown files in `.foundry/fixtures/` and then write tests testing those properties.
- Example: `task-003-locks-valid.md` with `locks: ["lock1"]` and verify the test passes.

## Acceptance Criteria
- [ ] Added `locks` field e2e verification in `.github/scripts/schema-fixtures.test.ts` or related testing artifacts.
- [ ] Created fixture files if necessary.
- [ ] Tests run successfully without regressions.
