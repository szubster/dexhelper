---
id: epic-037-057-gen3-berry-tracker-ui-and-optimization
type: EPIC
title: Gen 3 Berry Tracker UI and Optimization Engine
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-03'
updated_at: '2026-08-22'
depends_on:
  - epic-037-056-gen3-berry-tracker-map-integration
jules_session_id: null
pr_number: null
parent: prd-067-037-gen3-berry-tracker
tags:
  - feature
  - gen3
  - berries
  - ui
  - optimization
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-037-055-gen3-berry-tracker-data-extraction
notes: ''
---

# Epic: Gen 3 Berry Tracker UI and Optimization Engine

## Overview
This Epic involves building the user-facing UI components and the optimization logic for the Gen 3 Berry Farming Tracker. It builds upon the map integration (`epic-037-056-gen3-berry-tracker-map-integration`) to present actionable insights to the user.

## Details
*   **Dashboard/List View:** Create a dedicated view displaying all active berry patches, their current growth stage, and time estimations to the next stage based on mechanics.
*   **Map UI Integration:** Overlay the berry patch states onto the visual Gen 3 map representation, highlighting patches needing attention.
*   **Optimization Engine:** Develop logic to suggest optimal routes or a prioritized list of patches to visit in order to maximize yield (useful for Pokéblock blending).

## Acceptance Criteria
- [ ] Build a dashboard view that lists all active berry patches and their states.
- [ ] Integrate berry patch markers into the visual Gen 3 map UI.
- [ ] Implement an optimization function to calculate and suggest the most efficient route/order to visit ripe or high-priority berry patches.
- [ ] Display helpful time-to-growth estimates based on real-world time elapsed.
