---
id: research-044-211-gen3-roamer-ui-alternatives
type: RESEARCH
title: Investigate Gen 3 Roamer Tracker UI Alternatives
status: PENDING
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
  - map
research_references:
  - research-108-187-gen3-roamer-location-offsets
  - research-108-206-gen3-roamer-ewram-investigation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Tracker UI Alternatives

## Objective
Propose an alternative UI design for the Gen 3 Roamer Tracker that does not rely on static map locations.

## Description
Since ADR 108-027 establishes that extracting the roamer's immediate map coordinates from the `.sav` file is mathematically impossible, the original design of plotting the roamer on a Route Radar cannot be implemented. We need a new UI approach that effectively presents the available roamer data (Nature, IVs, HP, status, and activity state) without misleading the user about map location.

## Acceptance Criteria
- [ ] Review available roamer data (from core extraction).
- [ ] Propose an alternative UI layout/concept to present this data to the user without the Route Radar map.
- [ ] Document findings and recommendations for the Story Owner to translate into the Dashboard UI implementation.