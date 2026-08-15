---
id: story-116-250-gen3-ev-parsing-logic
type: STORY
title: Story - Gen 3 EV Parsing Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-02'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: '15863037152588661750'
pr_number: null
parent: epic-092-116-gen3-ev-data-extraction
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story - Gen 3 EV Parsing Logic

## 1. Objective
Implement the logic to extract Effort Values (EVs) from the decrypted Gen 3 Pokémon data structure using the `DataView` API.

## 2. Background
In Gen 3, EV data is stored in the EVs & Condition (E) substructure of the 48-byte encrypted Data block. The order of the substructures depends on `PV % 24`. We need to locate this substructure and read the 6 EV bytes correctly.

## 3. Scope
- Add parsing logic to extract EVs (HP, Attack, Defense, Speed, Sp. Atk, Sp. Def) from the `DataView`.
- Follow ADR 010 by exclusively using `DataView` methods.
- Make sure to correctly map the decrypted bytes to their corresponding stats.

## 4. Acceptance Criteria
