---
id: task-285-489-integrate-registered-numbers-ui-data
type: TASK
title: Integrate PokegearPhoneData into Gen2SaveData Schema
status: ACTIVE
owner_persona: coder
created_at: '2026-07-07'
updated_at: '2026-08-27'
depends_on: []
jules_session_id: '297217558567621074'
pr_number: null
parent: story-116-285-integrate-registered-numbers-ui
tags:
  - typescript
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Integrate PokegearPhoneData into Gen2SaveData Schema

## Objective
Update the `SaveData` schema to include the parsed Pokegear Phone data and wire up the parser in the extraction process for Gen 2 saves.

## Acceptance Criteria
- [x] Import `PokegearPhoneData` from `./gen2/phone/parser` in `src/engine/saveParser/parsers/common.ts`.
- [x] Add `gen2PokegearPhone?: PokegearPhoneData;` to the `Gen2SaveData` interface in `src/engine/saveParser/parsers/common.ts`.
- [x] Import `parseGen2PokegearData` from `./gen2/phone/parser` in `src/engine/saveParser/parsers/gen2.ts`.
- [x] Call `parseGen2PokegearData(view, isCrystal)` and include its return value as `gen2PokegearPhone` in the object returned by `parseGen2` in `src/engine/saveParser/parsers/gen2.ts`.
