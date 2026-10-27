---
id: task-564-716-gen3-map-e2e-tests-impl
type: TASK
title: Implement Gen 3 Map E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-22T11:09:59Z'
updated_at: '2026-10-22T11:09:59Z'
depends_on:
  - task-563-668-gen3-map-state-store
  - task-563-669-gen3-map-state-ui
jules_session_id: null
pr_number: null
parent: story-552-564-gen3-map-e2e-verification
tags:
  - dexhelper
  - gen3
  - e2e
  - integration
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Map E2E Tests

## Objective
Write Playwright E2E tests for the new map dashboard to verify core UI components and state management.

## Scope
- Write tests to verify toggle state changes reflect on the UI map layer.
- Ensure tactical hardware styling (ADR 008) is not compromised on different screen sizes using Playwright's mobile configurations.
- Use relative paths for navigation and `locator.or()` for Strict Mode OR conditions.

## Acceptance Criteria
- [x] Implement Playwright E2E tests for the Gen 3 Map dashboard.
- [x] Verify toggle state changes reflect on the UI map layer.
- [x] Verify tactical hardware styling on different screen sizes.
