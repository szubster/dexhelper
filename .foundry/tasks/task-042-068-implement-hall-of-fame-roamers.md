---
id: task-042-068-implement-hall-of-fame-roamers
type: TASK
title: Implement Hall of Fame & Roamers Extraction
status: "COMPLETED"
owner_persona: coder
created_at: '2026-05-06'
updated_at: "2026-05-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-026-042-hall-of-fame-roamers
tags:
  - gen2
  - save-parser
  - roamers
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Hall of Fame & Roamers Extraction

## Context
The Tech Lead has requested the implementation of Hall of Fame count and roaming legendary (Raikou, Entei, Suicune) map location extraction for Gen 2 save files.

## Technical Blueprint
- Update `SaveData` interface in `src/engine/saveParser/parsers/common.ts` to include `roamingLegendaries?: { speciesId: number; level: number; mapGroup: number; mapId: number }[];`.
- Update `parseGen2` in `src/engine/saveParser/parsers/gen2.ts` to extract the `hallOfFameCount` and `roamingLegendaries`.
- Use the following RAM offsets to find the correct data relative to `wPlayerData` (which starts at 0x2000 in the save file):
  - **Hall Of Fame Count**: offset `0x24EC` for GS, `0x24CE` for Crystal. It is a single byte.
  - **Roaming Legendaries**: offset `0x28DA` for GS, `0x28B6` for Crystal. The format is an array of 3 `roam_struct`s.
  - Each `roam_struct` is 7 bytes: `Species ID (1)`, `Level (1)`, `Map Group (1)`, `Map ID (1)`, `HP (1)`, `DVs (2)`.
  - Extract Raikou (Species 243), Entei (Species 244), and Suicune (Species 245) from these locations if the Species ID matches.
- Add tests to `src/engine/saveParser/parsers/gen2.test.ts` to verify the logic against mock `DataView` buffers with injected values.

## Acceptance Criteria
- [x] `SaveData` includes `roamingLegendaries`.
- [x] `parseGen2` successfully parses Hall of Fame count for GS and Crystal.
- [x] `parseGen2` successfully parses the specific map locations of Raikou, Entei, and Suicune for GS and Crystal.
- [x] Tests verify correct extraction of both components.
