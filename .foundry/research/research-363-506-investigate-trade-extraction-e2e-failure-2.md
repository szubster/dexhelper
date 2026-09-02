---
id: research-363-506-investigate-trade-extraction-e2e-failure-2
type: RESEARCH
title: Investigate NPC Trade Extraction E2E Implementation Failure (Retry)
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-31'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-349-363-trade-extraction-e2e
tags:
  - testing
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate NPC Trade Extraction E2E Implementation Failure (Retry)

## Objective
Investigate the root cause of the permanent failure of `task-363-441-trade-extraction-e2e-retry-impl` which failed with the reason `[ACKNOWLEDGED] Max rejection count reached`.

## Context
The previous implementation task failed permanently while trying to implement the E2E tests for the NPC trade flag extraction logic across Gen 2 and Gen 3 save files.

## Findings
The previous attempt failed. This task should investigate what is missing to implement the detection logic for Gen 3 saves correctly in `src/engine/saveParser/utils/detection.ts`, and what asserts need to be added to `tests/e2e/dashboard/gen3_npc_trades.spec.ts`.

## Acceptance Criteria
- [x] Determine why the previous E2E test implementation failed.
- [x] Document the required steps, tools, or dependencies needed to successfully implement the E2E tests for NPC trade extraction.


### Research Conclusions
1. The `isGen3Save` function inside `src/engine/saveParser/utils/detection.ts` has actually already been fixed in a recent commit. It now correctly identifies Gen 3 save files using the `0x08012025` signature logic and returns `true` for valid `.sav` files rather than acting as a stub.
2. The previous E2E test failures were caused by strict-mode locator violations in `tests/e2e/dashboard/gen3_npc_trades.spec.ts`. Specifically, there are two distinct DOM elements containing the text "IN-GAME TRADES" in the React tree (likely one is hidden or duplicated by the structural hierarchy).
3. The Playwright tests must use `.first()` correctly on locators like `page.getByText('IN-GAME TRADES')` to bypass strict mode errors.
4. The file `tests/e2e/dashboard/gen3_npc_trades.spec.ts` needs to be updated to load `tests/fixtures/emerald.sav` and verify the presence of Emerald-specific trade flags: `RUSTBORO`, `PACIFIDLOG`, `FORTREE`, and `BATTLE_FRONTIER`.
