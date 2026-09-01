---
id: prd-143-346-local-visual-regression-testing
type: PRD
title: Local Visual Regression Testing Setup
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-143-local-visual-regression-testing
tags:
  - testing
  - frontend
  - visual-regression
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Local Visual Regression Testing Setup

## Context
See Idea: `idea-143-local-visual-regression-testing`. We need a free, self-hosted, deterministic way to verify visual rendering locally and within CI without depending on third-party SaaS platforms.

## Functional Requirements
1. **Tooling Integration:** Utilize Playwright's `expect(page).toHaveScreenshot()` for screenshot comparison tests.
2. **Configuration:**
   - Define screenshot comparison tolerances (e.g., `maxDiffPixelRatio`).
   - Disable animations during tests to ensure deterministic rendering.
   - Configure CI to upload visual comparison reports (HTML) as build artifacts when tests fail.
3. **Test Coverage:**
   - Implement initial screenshot tests for critical user interfaces:
     - The interactive DAG visualization Canvas (`DagDashboard`).
     - Core application dashboards (e.g., standard layout with header and navigation).
     - Component states that are complex and error-prone.
4. **Local Developer Workflow:** Provide scripts and documentation for developers to easily update snapshots locally (e.g., `pnpm test:e2e --update-snapshots`).

## Acceptance Criteria
- [ ] Implement Playwright snapshot testing configurations.
- [ ] Add at least one visual regression test for the DAG dashboard.
- [ ] Add at least one visual regression test for the main Pokédex/Home view.
- [ ] Ensure CI pipeline captures and uploads HTML reports on failure.
- [ ] Epic Planner: Break this PRD down into Epics.
