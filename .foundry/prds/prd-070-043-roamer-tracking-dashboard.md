---
id: prd-070-043-roamer-tracking-dashboard
type: PRD
title: Roamer Tracking Dashboard PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-070-roamer-tracking-dashboard
tags:
  - feature
  - ux
  - map
  - exploration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: Roamer Tracking Dashboard

## 1. Problem Statement
In Gen 2 and Gen 3 Pokémon games, certain legendary Pokémon (Raikou, Entei, Suicune, Latios, Latias) "roam" the map, changing routes every time the player transitions between areas. Tracking them relies on constantly checking the Pokédex (if they've been seen) or sheer luck. This tedious process can be greatly alleviated by exposing their live map coordinates directly from the user's save file into DexHelper.

## 2. Current State & Technical Feasibility
Based on an initial evaluation of the codebase:
- **Gen 2 State**: `src/engine/saveParser/parsers/gen2.ts` already implements `parseRoamingLegendaries()` which successfully extracts `speciesId`, `level`, `mapGroup`, and `mapId` for Raikou, Entei, and Suicune. This data is available in the extracted `saveData.roamingLegendaries` object.
- **Gen 3 State**: No roamer parsing currently exists in `src/engine/saveParser/parsers/gen3.ts`. The offset data for Latios/Latias map coordinates must be identified and extracted.
- **UI State**: The `SuggestionEngine` currently provides generic advice to "Track [Roamer]", but does not display exactly *where* they are.

## 3. Scope & Requirements

### 3.1 Data Extraction (Engine Layer)
- Implement roamer data extraction for Gen 3 (Ruby, Sapphire, Emerald). Need to parse the save file for the active roaming Pokémon, its species ID, level, and current map location (map bank/group and map ID).
- Ensure parity in the return structure between Gen 2 and Gen 3 (e.g., standardizing the `roamingLegendaries` interface in `common.ts`).

### 3.2 Data Mapping (Translation Layer)
- The raw `mapGroup` and `mapId` bytes extracted from the save file are internal engine concepts. They must be mapped to human-readable Route names (e.g., "Route 34", "Route 110") that correspond to the UI's routing system or map rendering components.

### 3.3 User Interface (Presentation Layer)
- **Roamer Radar Widget**: Build a visible dashboard or map widget that lists all active roaming Pokémon in the save file.
- **Live Location**: Display the human-readable route where the roamer is currently located.
- **Status Tags**: Indicate if the roamer is "Active", "Caught", or "Defeated".
- **Map Integration**: Highlight the roamer's current route on the interactive `.foundry/docs/adrs/010-gen3-map-graph-design.md` style map.

## 4. Acceptance Criteria
- [ ] Gen 3 save parser correctly extracts Latios/Latias map group and ID.
- [ ] Gen 2 and Gen 3 raw map coordinates are translated into recognizable Route names.
- [ ] A dedicated UI component displays the current location of any active roamers.
- [ ] The feature only displays roamers that have actually been released in the save file's event flags.
- [ ] Break down this PRD into Epics.

## 5. Next Steps
- [ ] Epic Planner: Break this PRD down into executable Epics (e.g., Engine Parsing, Mapping Translation, UI Dashboard).
