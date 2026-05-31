---
id: prd-005-032-revert-data-optimizations
type: PRD
title: Revert Data Format Optimizations (Short Property Names)
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
parent: idea-005-revert-data-optimizations
rejection_reason: ''
---

# PRD: Revert Data Format Optimizations (Short Property Names)

## Context & Objectives
With the transition to MsgPack (`msgpackr`) and the configuration of highly-efficient decoding options (specifically `useRecords: true` and `bundleStrings: true`), our previous optimizations around making JSON as compact as possible may be obsolete and negatively impacting developer experience (DX).

MsgPack's `useRecords` extension extracts object structures/keys and passes them as an extension rather than stringifying them repetitively. This makes short property names largely redundant in terms of size optimization. A recent benchmark confirmed that long property strings differ by only 52 bytes per 1,000 objects.

The objective is to revert the short property names back to their full, readable names to improve DX while maintaining enum-to-number optimizations (which still provide significant size reductions).

## Scope
The exact list of properties to rename across the application (`PokeDB.ts`, `schema.ts`, `scripts/generate-pokedata.ts`, and associated files):
- `n` -> `name`
- `cr` -> `captureRate`
- `gr` -> `genderRate`
- `eto` -> `evolvesTo`
- `efrm` -> `evolvesFrom`
- `det` -> `evolutionDetails`
- `c` -> `chance`
- `m` -> `method`
- `min` -> `minLevel`
- `max` -> `maxLevel`
- `t` -> `timeOfDay`
- `aid` -> `areaId`
- `v` -> `versionId`
- `d` -> `details`
- `pid` -> `pokemonId`
- `enc` -> `encounters`
- `prnt` -> `parentId`
- `conn` -> `connections`
- `pids` -> `pokemonIds`
- `dist` -> `distances`
- `tr` -> `trigger`
- `ml` -> `minLevel`
- `mh` -> `minHappiness`
- `item` -> `itemId`
- `held` -> `heldItemId`
- `time` -> `timeOfDay`
- `rps` -> `relativePhysicalStats`
- `ef` -> `evolvesFromId`
- `poke` -> `pokemon`
- `loc` -> `locations`
- `hash` -> `hash` (unchanged, but noted for completeness)

## Requirements
- Update the Data Generation Pipeline: Refactor `scripts/generate-pokedata.ts` (and any other files in `data/` if applicable) to output verbose keys instead of the short ones.
- Update Runtime Interfaces: Refactor `src/db/schema.ts` and `src/db/PokeDB.ts` (and components that depend on them) to use the new verbose keys.
- Preserve Enum-to-Number Optimizations: Do not change how enumerations or strings are mapped to integers, as strings cannot be perfectly deduplicated.
- Ensure the application still works correctly with MsgPack `useRecords: true`.

## Acceptance Criteria
- [x] Determine how to propagate this into an ADR (Architecture Decision Record) since we are changing data contracts globally.
- [x] Ensure that an ADR is created to record this decision before creating Epics/Stories.

### Spawned Epics
- .foundry/epics/epic-032-042-generation-pipeline-keys.md
- .foundry/epics/epic-032-043-runtime-interfaces-keys.md
