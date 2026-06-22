---
id: task-149-212-gen1-hof-records-impl
type: TASK
title: Implement Gen 1 Hall of Fame Records Parsing
status: READY
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-149-parse-gen1-hof-records
tags:
  - task
  - parsing
  - hall-of-fame
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 1 Hall of Fame Records Parsing

## Blueprint Details
This task requires extending the `parseGen1` save parsing logic to extract actual Hall of Fame records from Gen 1 save files. Currently, the system only extracts `hallOfFameCount`. This needs to be expanded to extract the historical team data.

**Data Structure (per Bulbapedia research):**
- The Hall of Fame data begins at offset `0x0598` in Bank 0 of the save file. This is an absolute offset from the start of the file.
- The game stores up to 50 Hall of Fame Records.
- Each Hall of Fame Record is `0x60` (96) bytes long.
- A single record contains 6 Pokémon entries.
- Each Pokémon entry is `0x10` (16) bytes long.
- A Pokémon entry is structured as:
  - `0x00` (1 byte): Species ID (Internal ID, must be converted to Dex ID using `INTERNAL_ID_TO_DEX`).
  - `0x01` (1 byte): Level.
  - `0x02` (11 bytes): Pokémon Nickname (encoded using standard Gen 1 string encoding, decode using `decodeGen12String`).
  - `0x0D` (3 bytes): Padding / unused.

**Important Note on Player Name:**
The Hall of Fame data structure described by Bulbapedia does *not* include the player's name per-record. It only contains the 6 Pokémon. Therefore, you should use the global `trainerName` parsed from the save file for the player name in the extracted records.
*Note:* Be careful: if a record is empty/unused (e.g., Species ID is `0xFF` or `0x00`), it should be ignored. The game only populates up to `hallOfFameCount` records, or 50 records if it wraps around. Iterate up to `Math.min(hallOfFameCount, 50)` to extract valid records.

**Architectural Constraints:**
- You MUST use the `DataView` API (e.g., `getUint8`) for all extraction logic.
- **CRITICAL:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

**Coder / QA Reminders:**
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `parseGen1HallOfFameRecords` function in `src/engine/saveParser/parsers/gen1.ts` (or similar appropriate location).
- [ ] Define reusable constants at the module level for all Hall of Fame offsets and lengths.
- [ ] Extract the Pokémon species, level, and nickname for each record.
- [ ] Use the global `trainerName` for the player name associated with the records.
- [ ] Update the `SaveData` interface in `src/engine/saveParser/parsers/common.ts` to include the new `hallOfFameRecords` property (array of records).
- [ ] Integrate the extraction logic into `parseGen1` and populate the new property.
