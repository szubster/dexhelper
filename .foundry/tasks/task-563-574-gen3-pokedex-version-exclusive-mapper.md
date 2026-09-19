---
id: task-563-574-gen3-pokedex-version-exclusive-mapper
type: TASK
title: Gen 3 Pokédex Version Exclusive Mapper Utility
status: COMPLETED
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-19'
depends_on:
  - task-563-572-gen3-pokedex-version-exclusive-data
jules_session_id: null
pr_number: null
parent: story-552-563-gen3-pokedex-version-exclusive-mapping
tags:
  - dexhelper
  - gen3
  - pokedex
  - typescript
research_references: []
rejection_reason: ''
locks: []
---

# Gen 3 Pokédex Version Exclusive Mapper Utility

## Description
Implement the core logic to map missing Gen 3 Pokédex entries against version exclusive data.

## Context & Technical Specifications
- Adhere to the PokeData Property Naming Schema.
- Provide a utility/service to check if a specific species ID is a version exclusive based on the detected game version (which comes from save block extraction/parsing context).
- Expose a mapper function that takes an array of missing species IDs and the game version, and returns an object detailing which ones are exclusive to other versions vs available in the current one.

## Acceptance Criteria
- [x] Implement `getVersionExclusives(version)` returning arrays of species IDs for the given Gen 3 version.
- [x] Implement `mapMissingToAvailability(missingIds, version)` to split missing IDs into `available` and `versionExclusive` categories.
