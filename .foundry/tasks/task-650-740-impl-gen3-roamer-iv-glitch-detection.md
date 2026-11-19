---
id: task-650-740-impl-gen3-roamer-iv-glitch-detection
type: TASK
title: Implement Gen 3 Roamer IV Glitch Detection Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-11-03'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: '10728788298249057458'
pr_number: null
parent: story-398-650-gen3-roamer-iv-glitch-implementation
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Roamer IV Glitch Detection Logic

## Objective
Implement the detection logic for the Gen 3 Roamer IV Glitch.

## Description
Analyze the 32-bit IV field from the parsed `Roamer` struct to determine if it exhibits the Roamer IV Glitch signature. Implement the function `detectRoamerIVGlitch` in `src/engine/saveParser/gen3/roamer/glitchDetection.ts` and ensure it passes the previously written unit tests in `src/engine/saveParser/gen3/roamer/glitchDetection.test.ts`.
The Roamer IV Glitch affects Gen 3 roamers by discarding the top bits of the 32-bit IV field.
Specifically, a glitched spread has HP 0-31, Attack 0-7, and Defense, Speed, Sp. Atk, Sp. Def all 0.
The tests verify `expect(detectRoamerIVGlitch({hp: 15, attack: 3, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0})).toBe(ROAMER_IV_GLITCH_STATE.GLITCHED)`.

## Acceptance Criteria
- [ ] Implement the `detectRoamerIVGlitch` function to analyze the IVs.
- [ ] Ensure the function correctly identifies spreads matching the Roamer IV glitch signature (HP 0-31, Attack 0-7, other 0) and returns `ROAMER_IV_GLITCH_STATE.GLITCHED`.
- [ ] Ensure non-glitched spreads return `ROAMER_IV_GLITCH_STATE.NONE`.
- [ ] Verify the code passes the tests by running `pnpm test`.
