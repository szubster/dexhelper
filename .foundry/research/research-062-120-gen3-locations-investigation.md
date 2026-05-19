---
id: research-062-120-gen3-locations-investigation
type: RESEARCH
title: Investigate Gen 3 Locations Fetch Script Failure
status: PENDING
owner_persona: researcher
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
parent: story-032-062-gen3-data-generation-scripts
---

# Investigate Gen 3 Locations Fetch Script Failure

## Description
Investigate why the `generateMapLocations.ts` script failed to correctly fetch Gen 3 locations from `pret/pokeemerald`. The implementation in `task-062-100-gen3-locations-script-impl` repeatedly failed and reached the maximum rejection count.

## Objectives
- Determine the correct file paths and formats in the `pret/pokeemerald` repository for extracting map locations and group information.
- Provide a technical approach for parsing this data within the `generateMapLocations.ts` script.
- Ensure the approach adheres to the ADR 010 Gen 3 map graph design if applicable, specifically the bitwise shifting requirements for unique namespacing `(3 << 16) | (group << 8) | id`.
