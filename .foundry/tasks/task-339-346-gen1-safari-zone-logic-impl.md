---
id: task-339-346-gen1-safari-zone-logic-impl
type: TASK
title: Gen 1 Safari Zone Missing Encounters Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-339-gen1-safari-zone-save-state
tags:
  - backend
  - safari-zone
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Safari Zone Missing Encounters Logic Implementation

## Context
This task implements the logic to compare a user's Gen 1 save file data against the static Safari Zone encounter tables.

## Requirements
- **Save File Parsing**: Implement or extend Gen 1 save file parsing (`src/engine/saveParser/parsers/gen1.ts`) to extract current Pokédex (owned) data and PC Box data.
- Create a function or service to fetch missing Gen 1 Safari Zone encounters.
- It must take the parsed `SaveData` (which includes `owned`, `partyDetails`, `pcDetails`).
- It must load the Gen 1 static Safari Zone data from `src/engine/data/gen1/safariZone.ts`.
- Filter the static tables to only show Pokémon that the user does not own or have currently in their party or PC box.
- Output a list of available missing Safari Zone encounters grouped by area and version.
- **Architectural Constraint:** If any modifications are made to the save parser, all memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden. The parser must catch `RangeError` from out-of-bounds `DataView` reads and throw a new Error with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement missing encounter logic for Gen 1 Safari Zone.
- [ ] Write unit tests verifying the missing encounters are correctly identified based on save data.
- [ ] Ensure architectural constraints on memory parsing are strictly followed if the parser is touched.
