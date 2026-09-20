---
id: research-360-568-investigate-gen3-roamer-e2e-failure-v2
type: RESEARCH
title: Investigate Gen 3 Roamer E2E Test Failure v2
status: READY
owner_persona: researcher
created_at: '2026-09-09'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-397-360-gen3-roamer-integration-e2e
tags:
  - gen3
  - roamer
  - e2e
  - research
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 3 Roamer E2E Test Failure v2

## Objective
Investigate the root cause behind the repeated failures of task-360-489-gen3-roamer-e2e-impl-v2 which reached its max rejection count.

## Description
The task for implementing Playwright E2E tests for the Gen 3 Roamer Dossier rendering across different Gen 3 game versions failed permanently. We need to research why this occurred. It may be due to missing fixtures, Playwright sandbox constraints, or complexities with IndexedDB injection.

## Acceptance Criteria
- [x] Identify the root cause of the max rejection failure for Gen 3 Roamer E2E tests.
- [x] Determine a viable approach to implement these E2E tests (e.g. better mocks, alternative testing strategy).
- [x] Document findings and update context for the replacement implementation tasks.

## Findings
- **Root Cause of Max Rejection/Timeout:** Attempting to manipulate binary save files directly or relying on brittle DataView injections for Gen 3 E2E testing leads to complex sandbox constraints and test failures. Mocking raw `.sav` bytes via Playwright tests often breaks expected file structures, resulting in parser failures that break the test suite.
- **Viable Approach:** The recommended method for Playwright E2E testing when a specific state cannot be guaranteed by an existing `.sav` fixture is to inject the required data into the application state *after* standard initialization. Specifically, test implementations should load a standard fixture (like `emerald.sav`) via `initializeWithSave()`, and then use `page.evaluate()` to manipulate the `localStorage` key `dexhelper-settings` directly, injecting the required mock roamer data object before navigating to or verifying the Roamer Dossier UI.
