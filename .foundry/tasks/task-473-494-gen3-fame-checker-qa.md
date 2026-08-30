---
id: task-473-494-gen3-fame-checker-qa
type: TASK
title: QA Gen 3 Fame Checker Parser Implementation
status: ACTIVE
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-08-30'
depends_on:
  - task-473-493-gen3-fame-checker-impl
jules_session_id: '3849843489697588112'
pr_number: null
parent: story-332-473-gen3-fame-checker-parsing-logic
tags:
  - gen3
  - fame-checker
  - typescript
  - vitest
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Fame Checker Parser Implementation

## Context
The Coder has implemented the Gen 3 Fame Checker parser. As the QA persona, verify that the implementation meets all requirements and that the tests are thorough.

## Requirements
- Verify that `parseGen3FameChecker` is correctly reading the 16 `u16` values starting at `SaveBlock1` offset `0x3A54`.
- Verify the bitwise logic: `pickState` is `value & 0x03`, and `flavorTextFlags` are checked correctly against bits 2 through 7 (e.g., `(value >> 2) & 0x3F`).
- Verify `Gen3SaveData` has been updated with `gen3FameChecker`.
- Verify `parseGen3` is correctly calling `parseGen3FameChecker` and populating the property for FRLG saves (or generally if applicable to all).
- Run `pnpm lint` and `pnpm test` to ensure there are no errors.

## Acceptance Criteria
- [x] Parser correctly handles the 16-element array of bitfields.
- [x] Bitwise logic for `pickState` and the 6 `flavorTextFlags` is correct.
- [x] Unit tests adequately cover different values and bit flags.
- [x] Code passes linting and testing.
