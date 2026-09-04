---
id: prd-147-343-gen3-weather-anomaly-tracker
type: PRD
title: Gen 3 Weather Anomaly Tracker (Groudon & Kyogre)
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-14'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '9174375570432835861'
pr_number: null
parent: idea-147-gen3-weather-anomaly-tracker
tags:
  - feature
  - gen3
  - tracker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Weather Anomaly Tracker (Groudon & Kyogre)

## Context & Problem Statement
In Pokemon Emerald, after defeating the Elite Four, the weather institute occasionally reports severe weather anomalies (heavy rain or intense sunshine) on specific routes. These anomalies indicate the temporary presence of the legendary Pokemon Kyogre (Marine Cave) or Groudon (Terra Cave). The player has to travel to the Weather Institute, speak to the scientist to learn the current active route, and travel there quickly. If they are too slow, the anomaly moves to another route, requiring another trip to the Weather Institute.

This is a classic time-based/event-based hunt that requires frustrating backtracking if the player misses the window or forgets which route the scientist mentioned.

## Proposed Solution
Leverage DexHelper's save parsing engine to read the active weather anomaly event flags and variables in the Gen 3 save file.
- **Anomaly Dashboard/Overlay:** Display whether an anomaly is currently active, what type it is (Drought vs. Drizzle), and exactly which Route it is currently affecting.
- **Map Integration:** Highlight the affected route on the DexHelper Map UI with a weather icon.

## Technical Specifications & Discovered Memory Addresses
Based on the `pret/pokeemerald` source code, the active weather anomaly is primarily tracked by the `VAR_ABNORMAL_WEATHER_LOCATION` variable (`0x4037`).

The mapping is as follows:

**Terra Cave (Groudon - Drought)**
- `VAR_ABNORMAL_WEATHER_LOCATION` between `1` and `8`.
- 1: Route 114 (North)
- 2: Route 114 (South)
- 3: Route 115 (West)
- 4: Route 115 (East)
- 5: Route 116 (North)
- 6: Route 116 (South)
- 7: Route 118 (East)
- 8: Route 118 (West)

**Marine Cave (Kyogre - Drizzle)**
- `VAR_ABNORMAL_WEATHER_LOCATION` between `9` and `16`.
- 9: Route 105 (North)
- 10: Route 105 (South)
- 11: Route 125 (West)
- 12: Route 125 (East)
- 13: Route 127 (North)
- 14: Route 127 (South)
- 15: Route 129 (West)
- 16: Route 129 (East)

**None Active**
- `VAR_ABNORMAL_WEATHER_LOCATION` is `0`.

**Related Contextual Flags (For reference, if needed for validation):**
- `FLAG_HIDE_TERRA_CAVE_GROUDON` (0x30F)
- `FLAG_HIDE_MARINE_CAVE_KYOGRE` (0x30E)
- `FLAG_ARRIVED_AT_TERRA_CAVE_ENTRANCE` (SYSTEM_FLAGS + 0x7A)
- `FLAG_ARRIVED_AT_MARINE_CAVE_EMERGE_SPOT` (SYSTEM_FLAGS + 0x79)

## Value Proposition
This eliminates the need for tedious backtracking to the Weather Institute, streamlining the post-game legendary hunt for Kyogre and Groudon. It perfectly aligns with DexHelper's vision as a premium companion app that exposes hidden or tedious game states to the player in a clean UI.

## Acceptance Criteria
- [x] Break down this PRD into Epics.
- [ ] epic-343-517-gen3-weather-anomaly-data
- [ ] epic-343-518-gen3-weather-anomaly-ui
