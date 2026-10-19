---
id: task-619-687-multi-box-stat-filters-e2e-tests
type: TASK
title: Multi-Box Stat Filters E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-575-619-multi-box-stat-filters-e2e
tags:
  - dexhelper
  - feature
  - search
  - pc-box
  - e2e
  - playwright
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Multi-Box Stat Filters E2E Tests

## Objective
Write comprehensive Playwright E2E tests for the Multi-Box Stat Filters feature.

## Requirements
- Test both IV and EV stat filters functionality.
- Adhere to Playwright E2E Best Practices:
  - Use relative paths (e.g., `./dashboard`) for navigation.
  - Do not use `page.evaluate()` to manually inject hardcoded HTML strings. Target the actual rendered React components.
  - Use the `isMobile` fixture to conditionally adjust locators if needed.

## Acceptance Criteria
- [ ] Write integration E2E tests for IV stat filters.
- [ ] Write integration E2E tests for EV stat filters.
