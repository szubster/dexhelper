---
id: epic-037-515-gen3-berry-tracker-ui-and-optimization-retry
type: EPIC
title: Gen 3 Berry Tracker UI and Optimization Engine (Retry)
status: PENDING
owner_persona: story_owner
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on:
  - epic-037-514-gen3-berry-tracker-map-integration-retry
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
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Gen 3 Berry Tracker UI and Optimization Engine (Retry)

## Overview
This Epic is a retry of building the user-facing UI components and the optimization logic for the Gen 3 Berry Farming Tracker. It builds upon the map integration (`epic-037-514-gen3-berry-tracker-map-integration-retry`) to present actionable insights to the user.

## Details
*   **Dashboard/List View:** Create a dedicated view displaying all active berry patches, their current growth stage, and time estimations to the next stage based on mechanics.
*   **Map UI Integration:** Overlay the berry patch states onto the visual Gen 3 map representation, highlighting patches needing attention.
*   **Optimization Engine:** Develop logic to suggest optimal routes or a prioritized list of patches to visit in order to maximize yield (useful for Pokéblock blending).

## Acceptance Criteria
- [ ] Build a dashboard view that lists all active berry patches and their states.
- [ ] Integrate berry patch markers into the visual Gen 3 map UI.
- [ ] Implement an optimization function to calculate and suggest the most efficient route/order to visit ripe or high-priority berry patches.
- [ ] Display helpful time-to-growth estimates based on real-world time elapsed.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
