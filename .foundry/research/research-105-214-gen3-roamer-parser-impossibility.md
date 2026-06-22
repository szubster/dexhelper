---
id: research-105-214-gen3-roamer-parser-impossibility
type: RESEARCH
title: Investigate Gen 3 Roamer Location Parsing Impossibility
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - save-offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Parsing Impossibility

## Context
The task `task-105-197-gen3-roamer-parser-impl` failed permanently because the acceptance criteria required the extraction of `mapId` and `mapGroup` of the active roamer from the save file. This was identified as impossible according to `adr-108-027-gen3-roamer-location-impossible`.

## Decision
The implementation task must be recreated to omit the requirement of extracting map IDs. We will parse the roamer data that actually exists in `SaveBlock1`, specifically the `Roamer` struct and the global event flags indicating whether Latios/Latias has been released. The UI will have to rely on active roamer status and its IVs/Level/HP instead of map location.
