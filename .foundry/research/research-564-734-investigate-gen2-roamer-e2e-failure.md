---
id: research-564-734-investigate-gen2-roamer-e2e-failure
type: RESEARCH
title: Investigate Gen 2 Roamer E2E Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-30'
updated_at: '2026-11-03'
depends_on: []
jules_session_id: '3772638897904809429'
pr_number: null
parent: story-140-564-gen2-roamer-translation-integration
tags:
  - gen2
  - roamer
  - e2e
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Gen 2 Roamer E2E Failure

## Objective
Investigate the root cause of the permanent failure of \`task-564-669-gen2-roamer-e2e-tests\`.

## Description
- Analyze the failed Playwright E2E tests for the Gen 2 roamer translation UI.
- Determine how to properly test the UI without using \`page.evaluate()\` to directly inject hardcoded save state into the store, adhering to the Playwright E2E Architecture Policy.
- Provide clear instructions for rewriting the tests using standard application interaction and initialization hooks.

## Acceptance Criteria
- [x] Root cause of the test failure is identified and documented.
- [x] A solution is proposed to test the UI correctly according to policies.


## Findings & Recommendations

### Root Cause
The permanent failure of `task-564-669-gen2-roamer-e2e-tests` was caused by the usage of `page.evaluate()` to directly mutate the internal Zustand state (`store.setState()`) within the E2E tests. This directly violated the Playwright E2E Architecture Policy which strictly forbids injecting hardcoded save state or circumventing the application layer.

### Recommended Solution
To properly test the Gen 2 Roamer UI without violating policies:
1. Load the raw `.sav` fixture into a binary buffer using `fs.readFileSync` and convert it to a `Uint8Array`.
2. Directly write the specific roamer properties (species ID, level, map group, map number, HP) into the exact memory offsets in the binary array before initialization.
   - For `crystal.sav`, use `ROAMING_LEGENDARIES_OFFSET_CRYSTAL = 0x28b6`.
   - The struct size is `7` bytes.
   - Memory offsets inside the struct: Species = `0`, Level = `1`, Map Group = `2`, Map Number = `3`, HP = `4`.
3. Pass this dynamically patched binary array to `initializeWithSave(page, modifiedArray)` to simulate a genuine file upload to IndexedDB via the standard application pathways.
4. Replace all occurrences of `store.setState` inside `page.evaluate()` with this binary-patching technique prior to initializing the app.
