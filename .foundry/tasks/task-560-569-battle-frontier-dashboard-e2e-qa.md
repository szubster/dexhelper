---
id: task-560-569-battle-frontier-dashboard-e2e-qa
type: TASK
title: QA Verification for Battle Frontier Dashboard E2E Tests
status: PENDING
owner_persona: qa
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
  - task-560-568-battle-frontier-dashboard-e2e-coder
jules_session_id: null
pr_number: null
parent: story-079-560-battle-frontier-dashboard-e2e
tags:
  - e2e
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Verification for Battle Frontier Dashboard E2E Tests

## Description
Verify the Playwright E2E tests for the Battle Frontier Dashboard UI implementation. Ensure that the tests are robust, adhere to Playwright best practices, and correctly validate the UI integration.

## Acceptance Criteria
- [ ] Verify that tests cover BP wallet display and all 7 facility cards.
- [ ] Verify that tests assert the correct progress visuals based on the mocked save data.
- [ ] Verify the use of `locator.or()` with `.first()` for conditional waiting.
- [ ] Verify that the `isMobile` fixture is used appropriately for responsive testing.
- [ ] Execute `xvfb-run -a pnpm test:e2e <target_file>` to run the specific test file and confirm it passes.
