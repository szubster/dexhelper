---
id: task-473-493-gen3-fame-checker-impl
type: TASK
title: Gen 3 Fame Checker Parser Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '2761349881133918869'
pr_number: null
parent: story-332-473-gen3-fame-checker-parsing-logic
tags:
  - gen3
  - fame-checker
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Fame Checker Parser Implementation

## Context
Following the research into Fame Checker event flags, we need to implement the actual parser that extracts these 16-bit structures from `SaveBlock1` (offset `0x3A54`). The Fame Checker tracking includes 16 characters in total (Gym Leaders, Oak, Daisy, Bill, Mr. Fuji, etc.).

## Requirements
- Define the `Gen3FameCheckerData` interface containing an array of 16 objects. Each object should have `pickState` (2 bits) and `flavorTextFlags` (6 booleans corresponding to entries 1-6).
- Implement `parseGen3FameChecker(view: DataView, saveBlock1Offset: number)` in `src/engine/gen3/fameChecker/parser.ts`.
- The parser should read the array of 16 `u16` values starting at offset `0x3A54`.
- For each value, extract `pickState` (bits 0-1) and `flavorTextFlags` (bits 2-13, though only bits 2-7 are used for the 6 entries).
- Add `gen3FameChecker` to the `Gen3SaveData` interface in `src/engine/saveParser/parsers/common.ts`.
- Integrate the parser into the main `parseGen3` function in `src/engine/saveParser/parsers/gen3.ts`, specifically passing it only for FireRed and LeafGreen if applicable, or exposing it generally.
- Write unit tests in `src/engine/gen3/fameChecker/parser.test.ts`.

## Acceptance Criteria
- [ ] `Gen3FameCheckerData` type is defined.
- [ ] `parseGen3FameChecker` function is implemented and correctly applies bitwise operations.
- [ ] Data is correctly extracted from the `0x3A54` offset array.
- [ ] Unit tests verify correct extraction of `pickState` and individual text flags from raw `u16` values.
- [ ] Integrated into `Gen3SaveData` and `parseGen3`.
