---
id: task-564-670-gen2-roamer-qa
type: TASK
title: Gen 2 Roamer UI and E2E QA
status: ACTIVE
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-19'
depends_on:
  - task-564-668-gen2-roamer-ui-impl
  - task-564-669-gen2-roamer-e2e-tests
jules_session_id: '10309083917101630680'
pr_number: null
parent: story-140-564-gen2-roamer-translation-integration
tags:
  - gen2
  - roamer
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer UI and E2E QA

## Objective
Verify the Gen 2 roamer map translation end-to-end within the roamer tracking dashboard.

## Description
- Review the implemented UI components to ensure they properly display translated route names and adhere to ADR 008.
- Run and verify the Playwright E2E tests to confirm the integration is tested end-to-end.

## Acceptance Criteria
- [ ] The tracking dashboard correctly displays translated route names for roamers.
- [ ] E2E tests successfully verify the rendering of these locations.

### QA Rejection Note
The target task `task-564-669-gen2-roamer-e2e-tests` was rejected because the Playwright E2E tests violate the Playwright E2E UI Component Integration Testing policy. They use `page.evaluate()` to directly inject hardcoded save state into the store (bypassing the application layer), rather than relying on standard initialization hooks and verifying actual interactions.
