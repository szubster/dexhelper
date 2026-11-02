---
id: task-564-736-gen2-roamer-qa-retry
type: TASK
title: Gen 2 Roamer UI and E2E QA (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-10-30'
updated_at: '2026-11-02'
depends_on:
  - task-564-668-gen2-roamer-ui-impl
  - task-564-735-gen2-roamer-e2e-tests-retry
jules_session_id: null
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

# Gen 2 Roamer UI and E2E QA (Retry)

## Objective
Verify the Gen 2 roamer map translation end-to-end within the roamer tracking dashboard.

## Description
- Run and verify the updated Playwright E2E tests to confirm the integration is tested end-to-end.
- Ensure the tests comply with the Playwright E2E UI Component Integration Testing policy (no \`page.evaluate()\` store injection).

## Acceptance Criteria
- [ ] The tracking dashboard correctly displays translated route names for roamers.
- [ ] E2E tests successfully verify the rendering of these locations.
