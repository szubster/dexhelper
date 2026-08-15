---
id: task-250-251-gen3-ev-parsing-logic-impl
type: TASK
title: Implement Gen 3 EV Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-116-250-gen3-ev-parsing-logic
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 EV Parsing Logic

## 1. Objective
Implement the logic to extract Effort Values (EVs) from the decrypted Gen 3 Pokémon data structure using the `DataView` API.

## 2. Technical Spec
- In `src/engine/saveParser/parsers/gen3.ts`, create a new exported function `parseGen3EVs(view: DataView, offset: number)`.
- Extract the 6 EVs (HP, Attack, Defense, Speed, Sp. Atk, Sp. Def).
- The `offset` parameter will point to the start of the `EVs & Condition (E)` substructure.
- Create module-level constants for the 6 EV offsets:
  - `EV_HP_OFFSET = 0x00`
  - `EV_ATK_OFFSET = 0x01`
  - `EV_DEF_OFFSET = 0x02`
  - `EV_SPD_OFFSET = 0x03`
  - `EV_SPATK_OFFSET = 0x04`
  - `EV_SPDEF_OFFSET = 0x05`
- Return an object with keys `hp`, `attack`, `defense`, `speed`, `specialAttack`, `specialDefense`.
- Catch `RangeError` and throw a new Error with the message "The save file is corrupted or incomplete."
- Note: It is not required to map these into `parseGen3PokemonPVAndIVs`, just export the function.
- Write unit tests in `src/engine/saveParser/parsers/gen3.test.ts`.

## Acceptance Criteria
- [ ] Implement `parseGen3EVs` using `DataView`.
- [ ] Add explicit module-level constants for EV offsets.
- [ ] Handle `RangeError` by throwing "The save file is corrupted or incomplete."
- [ ] Write unit tests to cover successful parsing and bounds checking.
