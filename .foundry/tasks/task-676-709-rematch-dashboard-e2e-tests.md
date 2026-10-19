---
id: task-676-709-rematch-dashboard-e2e-tests
type: TASK
title: Rematch Dashboard E2E Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - task-676-708-rematch-dashboard-routing-impl
jules_session_id: null
pr_number: null
parent: story-085-676-rematch-dashboard-layout-and-routing
tags:
  - feature
  - gen3
  - ui
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Rematch Dashboard E2E Tests

## Overview
Implement Playwright E2E tests to verify the layout and routing of the Rematch Dashboard.

## Objectives
- Create E2E tests covering navigation to the Rematch Dashboard.
- Verify the structural layout and presence of key tactical primitives via Playwright.

## Instructions
- Ensure tests verify functionality by simulating real user interactions and asserting against rendered UI components, not internal global state (no `page.evaluate` for Zustand store).
- Use `locator.or()` carefully if conditional elements exist.
- Always consider `isMobile` context for navigation links.
- Tests should target actual React components, avoiding tautological tests with injected hardcoded HTML.
- Avoid `.click({ force: true })` on nested elements; prefer `.dispatchEvent('click')` if interception is an issue in headless mode.

## Acceptance Criteria
- [ ] Playwright E2E tests are implemented for the Rematch Dashboard navigation and layout.
- [ ] Tests simulate real user interactions and do not bypass the application layer.
- [ ] Tests run successfully in the CI environment (or local headless `xvfb-run -a pnpm test:e2e`).