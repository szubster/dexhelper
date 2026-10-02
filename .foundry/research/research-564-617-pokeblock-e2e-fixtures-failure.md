---
id: research-564-617-pokeblock-e2e-fixtures-failure
type: RESEARCH
title: Investigate Pokeblock E2E Fixtures Generation Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-22T12:00:00Z'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-540-564-gen3-pokeblock-optimizer-e2e
tags:
  - dexhelper
  - gen3
  - contests
  - e2e
  - fixtures
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Pokeblock E2E Fixtures Generation Failure

## 1. Context & Problem Statement
The generation of test fixtures for Pokéblock Optimizer E2E tests (`task-564-581-pokeblock-e2e-fixtures`) has reached its maximum rejection count and was permanently cancelled. We need to investigate why this occurred and determine the proper way to mock the save state data for Gen 3 Pokéblocks.

## 2. Solution Overview
Determine what caused the previous coder tasks to fail 3 times. Look at previous approaches or architectural limitations preventing fixture generation. Once the root cause is understood, document recommendations for the retry tasks.

## Acceptance Criteria
- [x] Investigate the root cause of the `task-564-581` failures.
- [x] Provide concrete implementation instructions for generating the required E2E fixtures.

## 3. Findings
### Root Cause Analysis
The previous attempts to generate test fixtures (`task-564-581`) failed permanently due to the complexity and brittleness of generating byte-perfect Gen 3 `.sav` files containing specific inventory (berries) and Pokéblock states. Manually constructing or hex-editing valid save files for integration testing is prone to checksum errors and data alignment issues, making it an unviable approach for reliable Playwright tests.

### Recommendations
To properly mock the save state data for Gen 3 Pokéblocks in E2E tests, we must abandon raw `.sav` file manipulation and instead inject mock application state directly into the IndexedDB `SaveDB` instance during test execution.

**Concrete Implementation Instructions for Retry Tasks:**
1. **Mock State Generation**: Create a JSON mock state file (e.g., `tests/fixtures/mock-state/pokeblock.json`) that defines the necessary Gen 3 Pokéblock and inventory data (e.g., `{ "gen3Pokeblocks": [...], "inventory": [...], "isGen3": true, "gameVersion": "emerald" }`).
2. **State Injection Utility**: Utilize the `injectMockState` utility function in `tests/e2e/test-utils.ts`. This function uses `page.evaluate()` to merge the JSON mock state directly into the existing `current_save` record within IndexedDB.
3. **E2E Test Flow**: In the Playwright tests, first call `initializeWithSave(page)` with a base save file, then immediately follow it with `injectMockState(page, 'tests/fixtures/mock-state/pokeblock.json')` to override the data, ensuring the application UI renders the specific test scenario reliably.
