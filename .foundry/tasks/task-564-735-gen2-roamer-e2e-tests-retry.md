---
id: task-564-735-gen2-roamer-e2e-tests-retry
type: TASK
title: Gen 2 Roamer E2E Tests (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-30'
updated_at: '2026-11-02'
depends_on:
  - task-564-668-gen2-roamer-ui-impl
  - research-564-734-investigate-gen2-roamer-e2e-failure
jules_session_id: null
pr_number: null
parent: story-140-564-gen2-roamer-translation-integration
tags:
  - gen2
  - roamer
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer E2E Tests (Retry)

## Objective
Write Playwright E2E tests for the Gen 2 roamer translation UI.

## Description
- Write E2E tests to confirm the dashboard correctly renders the human-readable route names for roamers.
- Apply the findings from \`research-564-734-investigate-gen2-roamer-e2e-failure\` to ensure tests interact with the application layer normally.
- Do NOT use \`page.evaluate()\` to directly inject hardcoded save states into the store.
- Use Playwright relative paths and correct assertions as per E2E policies.

## Acceptance Criteria
- [ ] E2E tests successfully verify the rendering of roamer locations.
- [ ] Tests use relative paths and correct strict mode assertions.
- [ ] Tests adhere to the Playwright E2E Architecture Policy (no direct store manipulation via evaluate).
