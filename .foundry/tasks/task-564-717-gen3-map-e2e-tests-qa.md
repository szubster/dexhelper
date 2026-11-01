---
id: task-564-717-gen3-map-e2e-tests-qa
type: TASK
title: QA Gen 3 Map E2E Tests
status: READY
owner_persona: qa
created_at: '2026-10-22T11:09:59Z'
updated_at: '2026-10-31'
depends_on:
  - task-564-716-gen3-map-e2e-tests-impl
jules_session_id: null
pr_number: null
parent: story-552-564-gen3-map-e2e-verification
tags:
  - dexhelper
  - gen3
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Gen 3 Map E2E Tests

## Objective
Verify the Playwright E2E tests implemented for the Gen 3 Map dashboard.

## Scope
- Ensure the tests comprehensively cover toggle state changes and tactical styling on different screen sizes.
- Verify adherence to Playwright E2E Best Practices (relative paths, `locator.or()`).
- Verify no tests rely on `page.evaluate()` injecting hardcoded HTML strings for UI components.

## Acceptance Criteria
- [ ] Verify Playwright E2E tests comprehensively cover toggle state changes.
- [ ] Verify tests adhere to Playwright E2E Best Practices.
