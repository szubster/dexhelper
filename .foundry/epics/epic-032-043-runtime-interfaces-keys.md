---
id: epic-032-043-runtime-interfaces-keys
type: EPIC
title: Update Runtime Interfaces to Verbose Keys
status: PENDING
owner_persona: story_owner
created_at: '2026-05-21'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
parent: prd-005-032-revert-data-optimizations
rejection_reason: ''
notes: ''
---
# Epic: Update Runtime Interfaces to Verbose Keys

## Objective
Update the runtime interfaces and components that load the generated PokeData to expect the new verbose property names, replacing the old minified accessors.

## Scope
- Update `src/db/schema.ts`, `src/db/PokeDB.ts` and associated application interfaces to map correctly to properties like `name`, `captureRate`, `genderRate`, `chance` and others defined in PokeData Property Naming Schema.
- Verify components accurately retrieve the data via the extended, readable keys.

## Prerequisites
- The `generate-pokedata.ts` script outputs verbose keys.

## Acceptance Criteria
- [ ] The application compiles without type errors in `src/db/schema.ts`.
- [ ] Components load Pokémon data without issues utilizing the expanded keys.
- [ ] story-043-336-update-runtime-interfaces-keys
