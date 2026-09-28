---
id: research-570-617-investigate-cva-tactical-aesthetic-e2e-failure
type: RESEARCH
title: Investigate CVA tactical aesthetic E2E test failure
status: READY
owner_persona: researcher
created_at: '2026-09-22T00:00:00Z'
updated_at: '2026-09-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-566-570-cva-theme-variables-e2e-verification
tags:
  - e2e
  - testing
  - styling
  - failure-investigation
research_references: []
rejection_count: 2
rejection_reason: ''
locks: []
priority: 60
---

# Research: Investigate CVA tactical aesthetic E2E test failure

## Context
The task `task-570-590-cva-tactical-aesthetic-e2e-coder` was permanently cancelled after reaching the maximum rejection count. It was tasked with writing Playwright E2E tests to validate that components like TacticalButton and TacticalBadge maintain their tactical aesthetic (sharp edges, dashed borders, monospaced fonts) under different CVA variants.

## Objective
Investigate the E2E test failure for the CVA tactical aesthetic task to determine the root cause of the rejections. Once the cause is identified, outline the exact required fixes so that the new coder task can successfully implement the E2E tests.

## Acceptance Criteria
- [x] Determine why the previous coder iterations for E2E tests failed or were rejected by QA/Auditor.
- [x] Identify if there are issues with how the CVA variants are rendering, how Playwright is locating the tactical elements, or if there is a mismatch with ADR 008 constraints.
- [x] Document the required fixes and constraints clearly in this research document.

### Findings

The issue with the previous implementation (`task-570-590-cva-tactical-aesthetic-e2e-coder`) is that the E2E tests written in `tests/e2e/tactical-utilities.spec.ts` are "tautological". Instead of mounting or locating the actual React components (like `TacticalButton` and `TacticalBadge`) as they are rendered in the application, the test manually injects HTML strings into the DOM via `page.evaluate()`.

For example, the test executes:
```javascript
container.innerHTML = '<button class="tactical-button ...">...</button>';
```

This approach only proves that if a DOM element has a specific set of CSS classes (e.g., `tactical-badge`), the browser applies the CSS styles defined in `src/index.css`. It *does not* verify that the actual React components in the application are correctly configured to use those classes via CVA, nor does it guarantee that the CVA variant logic outputs the expected CSS class strings when the components are used.

Because of this, the test provides a false sense of security and does not fulfill the true intent of E2E testing the CVA implementation, leading to rejections from the QA/Auditor personas.

### Required Fixes

1. **Rewrite E2E Tests to Target Real Components**: The Playwright tests in `tests/e2e/tactical-utilities.spec.ts` must be rewritten. Instead of injecting HTML, they should navigate to a route (like the dashboard) where these components are actually rendered.
2. **Component Integration**: Ensure that instances of the various `TacticalButton` and `TacticalBadge` variants are actually rendered somewhere in the application (or a dedicated Kitchen Sink route if necessary, though testing existing usages is preferred).
3. **Verify CSS on Rendered Components**: Use Playwright locators to find these real components and assert their CSS properties using `.toHaveCSS()` to ensure they adhere to ADR 008 (e.g., `border-radius: 0px`, `border-style: dashed`, `font-family` matching monospace).
