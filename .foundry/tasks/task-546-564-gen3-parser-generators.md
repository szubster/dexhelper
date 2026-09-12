---
id: task-546-564-gen3-parser-generators
type: TASK
title: Refactor Gen 3 Save Parsers to TypeScript Generators
status: ACTIVE
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: '5034205565967088742'
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
rejection_reason: ''
notes: ''
locks: []
---

# Refactor Gen 3 Save Parsers to TypeScript Generators

## Description
Per ADR 154, we need to aggressively adopt TypeScript generator functions (`function*` and `async function*`) for sequential data processing, save file parsing, binary chunk streams, tree traversals, and pagination engines. This task covers refactoring the core Gen 3 parsers to yield items via `function*`.

## Technical Blueprint
- Refactor `parseGen3PCBoxes` to `export function* iterateGen3PCBoxes(...)` yielding `{ pcDetails: PokemonInstance, speciesId: number, gen3Spindas: Gen3Spinda }`. Update `parseGen3` to consume it.
- Refactor `parseGen3Party` to `export function* iterateGen3Party(...)`. Update `parseGen3`.
- Update `src/engine/saveParser/gen3/storage/parser.ts` (`parseGen3PCBoxesWithStats`) and relevant tests to consume the new `iterateGen3PCBoxes` and `iterateGen3Party` instead of the old array-returning functions.
- Ensure the new generators compile and test correctly under Node.js native type stripping (no TS enums/namespaces).

## Acceptance Criteria
- [ ] Implement `function*` protocols for Gen 3 party and PC box parsing functions.
- [ ] Rename the parsed array functions to `iterate...`
- [ ] Update the main `parseGen3` functions to accumulate the yielded items into arrays to maintain the `SaveData` contract.
- [ ] Update the dependent files, such as `src/engine/saveParser/gen3/storage/parser.ts` and test files, to consume the new generator functions.
