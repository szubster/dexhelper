---
id: research-412-563-investigate-feebas-e2e-timeout
type: RESEARCH
title: Investigate Feebas E2E Timeout
status: READY
owner_persona: researcher
created_at: '$(date -I)'
updated_at: '$(date -I)'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-412-feebas-parsing-e2e
tags:
  - e2e
  - debugging
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Feebas E2E Timeout

## Objective
Investigate the root cause of the Feebas E2E timeout that caused `task-412-440-feebas-parsing-e2e-impl` to fail permanently.

## Acceptance Criteria
- [x] Identify the cause of the timeout (e.g. bash timeout, Playwright hangs, locator issues).
- [x] Provide a summary of findings and recommendations to fix the E2E tests.


## Findings
The failure was caused by a bash session timeout. The command execution took over 400 seconds while attempting to run E2E tests (`pnpm test:e2e`), which triggered the strict system timeout mechanism.

The core policies and test guidelines note that running the entire E2E suite locally during a session can easily exceed the bash timeout limit.

Additionally, we need to ensure that `page.evaluate()` is used for injecting test fixtures into IndexedDB (like `SaveDB`) instead of relying on brittle file picker API injections, which aligns with the latest E2E testing architecture updates (e.g., Epic 005-016). We also need to avoid using `page.evaluate()` to evaluate the DOM or trigger UI events directly, and instead use Playwright's built-in locators. Finally, always call `waitForSync(page)` after navigation to ensure the IndexedDB sync completes.

## Recommendations
- **Target Specific Files:** When running Playwright E2E tests locally to verify code changes, execute only the affected test files (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/specific.spec.ts`) to avoid triggering the 400-second bash session timeout.
- **Fixture Injection:** Use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to hydrate the application state with real save fixtures instead of attempting manual file uploads via UI locators.
- **Locators:** Use built-in Playwright locators for DOM assertions and interactions instead of `page.evaluate()`.
- **Synchronization:** Call `waitForSync(page)` after navigating to ensure that IndexedDB background syncing has completed before proceeding with assertions.
