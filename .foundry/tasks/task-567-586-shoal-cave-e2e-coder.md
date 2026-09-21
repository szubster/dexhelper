---
id: task-567-586-shoal-cave-e2e-coder
type: TASK
title: Write Playwright E2E Tests for Shoal Cave Dashboard
status: ACTIVE
owner_persona: coder
created_at: '2026-09-16T22:50:17Z'
updated_at: '2026-09-21'
depends_on: []
jules_session_id: '8103325990780056804'
pr_number: null
parent: story-412-567-shoal-cave-e2e-verification
tags:
  - e2e
  - integration
  - gen3
  - shoal-cave
  - playwright
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write Playwright E2E Tests for Shoal Cave Dashboard

## Context
We need to verify the end-to-end functionality of the Shoal Cave UI Dashboard. This involves ensuring that the Dashboard correctly displays the tide status (High/Low), the countdown to the next tide change, the counts for Shoal Shells and Shoal Salts, and the crafting readiness indicator for the Shell Bell. The tests should be implemented using Playwright.

## Constraints
- Do NOT use `@testing-library/react` or `@testing-library/*`. Use `@playwright/test` for E2E testing.
- Target the affected test files locally with `xvfb-run -a pnpm test:e2e tests/e2e/<file>.spec.ts` when testing changes locally.
- When waiting for elements, use strict mode OR conditions if applicable (e.g., `locator.or()`).
- Always use the `isMobile` fixture in Playwright to conditionally adjust locators for navigation elements based on screen size.

## Acceptance Criteria
- [ ] Implement a Playwright E2E test file (e.g., `tests/e2e/shoal-cave-dashboard.spec.ts`) for the Shoal Cave UI Dashboard.
- [ ] Add tests verifying the display of the current tide and countdown.
- [ ] Add tests verifying the display of Shoal Shell and Shoal Salt item counts.
- [ ] Add tests verifying the Shell Bell crafting readiness visual indicator.
- [ ] Verify that tests pass successfully in both desktop and mobile contexts.
