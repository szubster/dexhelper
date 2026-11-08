---
id: task-650-741-qa-gen3-roamer-iv-glitch-detection
type: TASK
title: QA Gen 3 Roamer IV Glitch Detection Logic
status: READY
owner_persona: qa
created_at: '2026-11-03'
updated_at: '2026-11-03'
depends_on:
  - task-650-740-impl-gen3-roamer-iv-glitch-detection
jules_session_id: null
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

# QA Gen 3 Roamer IV Glitch Detection Logic

## Objective
Verify the implementation of the Gen 3 Roamer IV Glitch detection logic.

## Description
Review the implementation in `src/engine/saveParser/gen3/roamer/glitchDetection.ts` and ensure the tests in `src/engine/saveParser/gen3/roamer/glitchDetection.test.ts` pass successfully. The logic should correctly detect glitched spreads (HP 0-31, Attack 0-7, and Defense, Speed, Sp. Atk, Sp. Def all 0).

## Acceptance Criteria
- [ ] Verify the detection logic accurately matches the glitch signature.
- [ ] Verify all unit tests for the detection logic pass.
