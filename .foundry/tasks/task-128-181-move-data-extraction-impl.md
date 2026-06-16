---
id: task-128-181-move-data-extraction-impl
type: TASK
title: Implement Move Data Extraction
status: FAILED
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: '8673200979951711396'
pr_number: null
parent: story-086-128-move-data-extraction
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 1
rejection_reason: 'The implementation is completely missing. scripts/generate-pokedata.ts does not contain any logic for move data extraction, and data/db/moves.jsonl is not generated.'
notes: ''
---

# TASK: Implement Move Data Extraction

## Background
As per ADR 025 and Story 128, we need to extract move data from PokeAPI and write it to `moves.jsonl` as part of the data generation pipeline (`scripts/generate-pokedata.ts`).

## Requirements
1.  **Modify Generation Script:** Update `scripts/generate-pokedata.ts` to iterate through all moves (up to Gen 3) and extract relevant data from the downloaded PokeAPI dataset (`TEMP_DIR/data/api/v2/move`).
2.  **Compact Data Structure:** The extracted data must follow this exact schema, omitting fields that are null or match defaults to save space:
    *   `id`: `number` (The PokeAPI ID)
    *   `name`: `string` (The English name)
    *   `type`: `number` (The type ID, derived from the URL or name mapping)
    *   `p` (power): `number | undefined` (Omit if 0 or null)
    *   `acc` (accuracy): `number | undefined` (Omit if null or 100)
    *   `pp`: `number` (Base PP)
    *   `dmg_class`: `number` (1 for physical, 2 for special, 3 for status, derived from damage_class)
    *   `effect`: `number | undefined` (Effect chance or ID, if applicable)
3.  **Output File:** The resulting list must be written out to `OUTPUT_DIR/moves.jsonl` using the existing `compact` function and `writeJsonl` utility.
4.  **Error Handling:** Ensure the code safely handles missing data for certain moves.
5.  **Gen 3 Limits:** We primarily care about moves present up to Gen 3 (IDs <= 354).

## Critical Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (which shouldn't be the case here, as code changes are expected), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Logic is added to `scripts/generate-pokedata.ts` to parse move data from the PokeAPI dataset.
- [ ] The generated move structures conform strictly to the ADR 025 schema (with abbreviations `p`, `acc`, `pp`, `dmg_class`).
- [ ] Values matching defaults (e.g., accuracy 100) are explicitly omitted via the existing compaction logic.
- [ ] The data is written to `moves.jsonl` in the `data/db` directory.
