---
id: idea-147-add-more-test-fixtures
type: IDEA
title: Add more real save file test fixtures for Gen 1, 2, and 3
status: READY
owner_persona: product_manager
created_at: '2026-08-12'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - testing
  - fixtures
  - saveParser
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Add more real save file test fixtures for Gen 1, 2, and 3

## Context & Problem Statement
Currently, our test suite has a limited set of save file fixtures under `tests/fixtures/`, mostly containing a single trainer Carlyle, KRIS and YELLOW. To ensure robustness of our save parser against multiple different game origins, progress checkpoints, and other custom save traits, we need more real save file fixtures.

## Proposed Solution
We propose exploring and integrating additional public real save files (such as those from Goatzilla or Bl1ndBeholder repos) into our test suite. Specifically, we want:
1. `red.sav` (Gen 1 Red)
2. `blue-evolve.sav` (Gen 1 Blue with evolved teams)
3. `silver.sav` (Gen 2 Silver)
4. `crystal-evolve.sav` (Gen 2 Crystal with evolved teams)
5. `emerald.sav` (Gen 3 Emerald)
6. and more. it does not hurt to have a lot.

We will adapt `saveFixtures.test.ts` to support testing all these new fixtures using parameterized tests (`test.for` in Vitest).

use those fixtures to improve current tests across board, write new tests, stop skipping tests that lacked them.

create new ideas, if you find more improvements.

create new idea node for save editor (cli) that will be used to manipulate saves, which will be needed in future, when we have and want to test multi save support and progression. we may utilise it also for trading between saves. explore possibilities as part of this new idea.

## Acceptance Criteria
- [ ] Create a new idea node file: `.foundry/ideas/idea-147-add-more-test-fixtures.md`
- [ ] Add new real save file test fixtures under `tests/fixtures/` covering Gen 1, 2, and 3: `red.sav`, `blue-evolve.sav`, `silver.sav`, `crystal-evolve.sav`, `emerald.sav` and more.
- [ ] Refactor `saveFixtures.test.ts` loader to support Gen 1, 2, and 3, and run parameterized verification over all of them.
- [ ] Verify all 1120 unit and browser tests pass successfully.
- [ ] create new idea node
- [ ] extend current set of tests
