---
id: research-105-211-gen3-roamer-parser-failure
type: RESEARCH
title: Investigate Gen 3 Roamer Parser Failure
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
  - parsing
research_references:
  - adr-108-027-gen3-roamer-location-impossible
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Parser Failure

## Objective
Determine the root cause of the permanent failure in `task-105-197-gen3-roamer-parser-impl`.

## Context
The implementation task `task-105-197-gen3-roamer-parser-impl` failed permanently because it was tasked with extracting the `mapId` and `mapGroup` of the Gen 3 roamer. As per `adr-108-027-gen3-roamer-location-impossible`, this data is not serialized into the `.sav` file, making extraction mathematically impossible.

## Acceptance Criteria
- [x] Investigate the failure and confirm that extracting map location data is impossible.
- [x] Propose an alternative strategy: the parser should only extract species, level, and active status, omitting map data entirely.
