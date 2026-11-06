---
id: task-648-728-gen3-ash-dashboard-tests-qa
type: TASK
title: 'Task: QA Gen 3 Ash Dashboard Integration & E2E Tests'
status: ACTIVE
owner_persona: qa
created_at: '2026-10-04T12:00:00.000Z'
updated_at: '2026-11-06'
depends_on:
  - task-648-726-gen3-ash-dashboard-integration-tests
  - task-648-727-gen3-ash-dashboard-e2e-tests
jules_session_id: '830540077306133405'
pr_number: null
parent: story-269-648-gen3-ash-dashboard-e2e
tags:
  - qa
  - e2e
  - integration
research_references: []
rejection_reason: ''
locks: []
---

# Task: QA Gen 3 Ash Dashboard Integration & E2E Tests

## Description
Verify the integration and E2E tests implemented for the Gen 3 Volcanic Ash Tracker Dashboard.

## Acceptance Criteria
- [x] Verify integration tests correctly use `vitest-browser-react`.
- [x] Verify E2E tests adhere to Playwright best practices.
- [x] Run tests and `xvfb-run -a pnpm test:e2e` to ensure reliability.
