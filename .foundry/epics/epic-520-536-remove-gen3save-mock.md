---
id: epic-520-536-remove-gen3save-mock
type: EPIC
title: "Remove isGen3Save mock and fix heuristic"
status: READY
owner_persona: "story_owner"
created_at: "2026-09-05"
updated_at: "2026-09-05"
depends_on: []
jules_session_id: null
locks: []
parent: prd-086-520-fix-gen3save-mock
---

## Context
The `isGen3Save` heuristic is currently mocked in tests (e.g. returning `false` or being bypassed). This causes E2E tests on Gen 3 to require a bypass mechanism. We need to remove the mock, run the actual heuristic in tests, and fix the heuristic if it throws errors so it succeeds during E2E and unit tests.

## Epic Requirements
- Identify and remove all instances where `isGen3Save` is mocked in tests (e.g., `index.test.ts` and E2E tests).
- Run tests and fix any underlying issues or flaws in the `isGen3Save` heuristic that cause it to fail when run against actual mock save data or during E2E execution.
- Ensure the `isGen3Save` heuristic runs successfully and correctly identifies Gen 3 saves without bypassing.

## Acceptance Criteria
- [x] Break down this Epic into STORY nodes.
- [x] Ensure this Epic generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-536-550-remove-mock-and-fix-heuristic
- [ ] story-536-551-integration-e2e-verification
