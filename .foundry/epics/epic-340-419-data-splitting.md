---
id: epic-340-419-data-splitting
type: EPIC
title: Implement static Pokedex data splitting
status: PENDING
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: null
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - bundles
  - database
rejection_count: 0
rejection_reason: ''
notes: ''
---
# EPIC: Implement static Pokedex data splitting

## Context & Objectives
Split the large static Pokedex payload into core and extension bundles, loading extensions on demand.

## Requirements
- Update `vite-plugins/pokedata-plugin.ts` to emit multiple msgpack bundles (core and extensions).
- Refactor `src/db/PokeDB.ts` synchronization logic to support multi-part synchronization when specific generations are required.

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-419-477-pokedata-plugin-refactor
- [ ] story-419-478-pokedb-sync-refactor
- [ ] story-419-479-data-splitting-e2e
