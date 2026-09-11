---
id: task-546-562-gen1-parser-generators
type: TASK
title: Refactor Gen 1 Save Parsers to TypeScript Generators
status: PENDING
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-537-546-generator-save-file-parsers
tags:
  - typescript
  - typescript-7
  - generators
  - architecture
  - performance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Refactor Gen 1 Save Parsers to TypeScript Generators

## Description
Per ADR 154, we need to aggressively adopt TypeScript generator functions (`function*` and `async function*`) for sequential data processing, save file parsing, binary chunk streams, tree traversals, and pagination engines. This task covers refactoring the core Gen 1 parsers to yield items via `function*`.

## Technical Blueprint
- Refactor `parsePCBoxes` to `export function* iterateGen1PCBoxes(...)` yielding `{ pcDetails: PokemonInstance, speciesId: number, currentBoxCount: number }`. Update consumers within the file.
- Refactor `parsePartyList` to `export function* iterateGen1PartyList(...)` yielding `PokemonInstance`.
- Update `parseGen1` to collect these generator yields explicitly where arrays are required for the `Gen1SaveData` result.
- Ensure explicit array conversion via `Array.from()` or spreads where the array is immediately needed for backwards compatibility or full object creation.
- Ensure the new generators compile and test correctly under Node.js native type stripping (no TS enums/namespaces).

## Acceptance Criteria
- [ ] Implement `function*` protocols for Gen 1 party and PC box parsing functions.
- [ ] Rename the parsed array functions (e.g. `parseGen1PCBoxes`) to `iterate...` (e.g. `iterateGen1PCBoxes`).
- [ ] Update the main `parseGen1` functions to accumulate the yielded items into arrays to maintain the `SaveData` contract.
