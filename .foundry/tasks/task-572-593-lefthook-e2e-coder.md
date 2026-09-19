---
id: task-572-593-lefthook-e2e-coder
type: TASK
title: Write Playwright E2E Test for Lefthook Schema Validation
status: READY
owner_persona: coder
created_at: '2026-09-18'
updated_at: '2026-09-18'
depends_on:
  - story-554-571-lefthook-integration
jules_session_id: null
parent: story-554-572-lefthook-e2e
tags:
  - e2e
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Playwright E2E Test for Lefthook Schema Validation

## Objective
Create a Playwright script `tests/e2e/lefthook_schema_validation.spec.ts` to verify the pre-commit hook aborts on malformed files.

## Context
The goal is to test the integration of `.foundry` files with Lefthook. Specifically, we want to simulate a commit involving a malformed schema file (e.g., an invalid frontmatter) and assert that the hook (`validate-foundry-schema`) fails the validation, preventing the commit.

## Requirements
1. The test should mock a repository structure in a temporary directory.
2. It should run the `scripts/validate-foundry-schema.ts` explicitly on a malformed `.foundry` file created within the temporary repo to verify the script exits with code `1`.
3. It should also verify that running on a properly formed file exits with code `0`.

## Acceptance Criteria
- [ ] Playwright E2E script `tests/e2e/lefthook_schema_validation.spec.ts` is created and correctly validates schema failure.
