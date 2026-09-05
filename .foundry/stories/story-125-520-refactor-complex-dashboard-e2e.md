---
id: story-125-520-refactor-complex-dashboard-e2e
type: STORY
title: E2E Verification for Complex Dashboard Components Migration
status: READY
owner_persona: tech_lead
created_at: '2026-09-03T13:29:59.885Z'
updated_at: '2026-09-03T13:29:59.885Z'
depends_on:
  - story-125-519-refactor-complex-dashboard
jules_session_id: null
pr_number: null
parent: epic-071-125-migrate-complex-app-components-v2
tags:
  - styling
  - refactor
  - ui
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: E2E Verification for Complex Dashboard Components Migration

## Context
Following the Tailwind v4 migration of complex dashboard components and specialized tracker UIs to use \`@utility\` classes, an exclusive Integration and E2E Verification story is required to ensure no visual or functional regressions have been introduced.

## Objectives
- **E2E Testing:** Verify that the refactored dashboard layouts and complex trackers render correctly.
- **Aesthetic Validation:** Validate that the tactical hardware aesthetics (sharp edges, dashed borders, specific background themes, and font styling) have not degraded as a result of using the new \`@utility\` classes.

## Implementation Details
1. Create or update E2E tests in \`tests/e2e/dashboard.spec.ts\` and \`tests/e2e/trackers.spec.ts\` (or relevant file) using Playwright.
2. Assert on visual styles corresponding to \`tactical-panel\`, \`tactical-text\`, and other relevant \`@utility\` classes by checking computed styles or snapshot tests.

## Acceptance Criteria
- [ ] E2E tests explicitly verifying the structural rendering and style persistence of dashboard and tracker components are implemented and passing.
