---
id: story-086-275-move-runtime-integration
type: STORY
title: Move Data Runtime Integration
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '12760911930413794579'
pr_number: null
parent: epic-049-086-dynamic-move-pp-parsing
tags:
  - refactor
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# STORY: Move Data Runtime Integration

## Background
The `moves.jsonl` data has been successfully generated via `scripts/generate-pokedata.ts`. However, the client runtime has not been updated to load, inflate, or use this newly generated data. We need to integrate this data into the application and replace hardcoded tables as requested by the Auditor.

## Goals
1. Integrate the `moves.jsonl` data into the client runtime (`src/db/schema.ts`, `src/db/PokeDB.ts`, etc.).
2. Ensure the compact representations from `moves.jsonl` are inflated correctly before being stored in IndexedDB.
3. Replace manual/hardcoded tables for move data in the application runtime, enabling accurate PP limit calculations dynamically.

## Acceptance Criteria
- [ ] Integrate the parsed `moves` dataset into the client database schema and sync process.
- [ ] Implement inflation logic in the client runtime to restore omitted default values for move data.
- [ ] Remove hardcoded manual move data tables and switch the runtime to utilize the dynamic PokeDB data.

## Implementation Tasks
- [ ] task-275-435-move-db-schema-inflation
- [ ] task-275-436-move-db-schema-qa
- [ ] task-275-437-move-runtime-refactor
- [ ] task-275-438-move-runtime-qa

- [x] Break down into Tasks
