---
id: epic-340-419-data-splitting
type: EPIC
title: Implement static Pokedex data splitting
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '6706478323854200827'
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
- [ ] Break down this epic into stories.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
