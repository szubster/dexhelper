---
id: research-413-493-investigate-bike-requirements-source
type: RESEARCH
title: Investigate Bike Requirements Source for RouteRadarHeatmap
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '4421475680146254951'
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
  - radar
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Bike Requirements Source for RouteRadarHeatmap

## Context
The RouteRadarHeatmap interface and calculateHeatmap function in RouteRadarController need to be updated to include bike requirements (requiresMachBike, requiresAcroBike). However, it is unclear where this data should be sourced from within the calculateHeatmap context. The parseBikeRequirements function exists in src/engine/gen3/mapParsing/mapRequirements.ts but requires a metatiles array, which is not available in the UnifiedLocation schema or Suggestion types.

## Objectives
1. Determine the source of the metatiles array for map definitions or if the bike requirements should be pre-calculated and stored in the database (UnifiedLocation) or injected via suggestions.
2. Identify how calculateHeatmap can access this information efficiently.
3. Recommend structural changes to schema or interfaces to facilitate this.

## Research Findings
1. **Source of Metatiles:** The `metatiles` array should not be fetched at runtime. The raw data resides in `map.bin` and `metatile_attributes.bin` in the `pret/pokeemerald` repository, which can be parsed offline.
2. **Data Sourcing & Access:** Bike requirements (`requiresMachBike` and `requiresAcroBike`) should be pre-calculated during the offline ETL generation phase (`scripts/gen3-fetch-locations.ts` and `scripts/generate-pokedata.ts`) using the existing `parseBikeRequirements` logic, and baked directly into the `UnifiedLocation` database schema (e.g., as boolean flags `mb` and `ab`).
3. **Actionable Steps for Coder:**
    - Update `src/db/schema.ts` to add optional `mb` (Mach Bike) and `ab` (Acro Bike) boolean properties to the `UnifiedLocation` interface.
    - Update the ETL scripts to extract and inject these flags into the location data during the build process.
    - Update `suggestionEngine` to read these flags from `allLocations` and attach them to the `Suggestion` objects (e.g., inside `encounterInfo`), or have `RouteRadarController` query `PokeDB` directly by `areaId` to retrieve the flags when building the heatmap.

## Acceptance Criteria
- [x] researcher: Determine how and where bike requirements should be stored and accessed.
- [x] researcher: Provide actionable steps for the coder to implement the data sourcing for RouteRadarController.
