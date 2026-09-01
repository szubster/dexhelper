---
id: prd-067-037-gen3-berry-tracker
type: PRD
title: Gen 3 Berry Farming Tracker
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '1691514318447933644'
pr_number: null
parent: idea-067-gen3-berry-tracker
tags:
  - feature
  - gen3
  - berries
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Berry Farming Tracker

## Overview
This PRD outlines the requirements for implementing a Gen 3 Berry Farming Tracker. It aims to automate the tracking of berry patches in Generation 3 games (Ruby, Sapphire, Emerald).

## Features
1.  **Data Extraction (Engine Layer):**
    *   Parse the state of all berry patches (planted, sprouted, taller, flowering, ripe) from the save file, using the `DataView` API as mandated by ADR 010.

2.  **UI/UX Implementation:**
    *   **Dashboard/List View:** Create a dedicated view displaying all active berry patches and their current growth stage.
    *   **Map Integration:** Overlay berry patch locations and statuses on the static Gen 3 map graph (leveraging the map graph architecture defined in ADR 010).
    *   **Helpful Info:** Show helpful info mentioning expected growth times based on standard mechanics (without assuming save file RTC context) or calculate relative to the current real-world time if applicable.

3.  **Optimization Engine:**
    *   Suggest optimal routes or patches to visit to maximize yield, particularly for endgame tasks like Pokéblock blending.

## Data Structures
*   **Berry Patch Data:** Needs to capture the patch location (map ID), berry type, current growth stage, time planted/last watered, and calculated time to next stage.
*   **Map Integration:** The `UnifiedLocation` objects will need to be extended or mapped to support displaying berry patch states.

## Constraints & Dependencies
*   Data parsing must strictly adhere to the `DataView` API and bounds checking guidelines outlined in `010-gen3-data-parsing.md`.
*   Data must be serialized using `msgpackr` in accordance with `010-msgpack-for-gen3-data.md`.
*   Map integration must align with the unified `gen3Graph.ts` architecture defined in `010-gen3-map-graph-design.md`.

## Acceptance Criteria
- [x] Epic Planner: Break this PRD down into Epics.

## Generated Nodes
* `.foundry/epics/epic-037-055-gen3-berry-tracker-data-extraction.md`
* `.foundry/epics/epic-037-056-gen3-berry-tracker-map-integration.md`
* `.foundry/epics/epic-037-057-gen3-berry-tracker-ui-and-optimization.md`
