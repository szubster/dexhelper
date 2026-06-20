---
id: research-044-207-gen3-roamer-alternative-ui
type: RESEARCH
title: Investigate Alternative Gen 3 Roamer Representation
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
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Alternative Gen 3 Roamer Representation

## Objective
Determine the best way to represent the roaming legendary on the UI despite the missing exact location data.

## Description
The original Route Radar integration failed because Gen 3 save files do not contain the roamer's active map coordinates (as per ADR 108-027). This RESEARCH node will investigate alternative ways to present the roamer's state to the user without a map, such as focusing on its internal state, capture status, or providing a textual explanation of why its location cannot be mapped.

## Acceptance Criteria
- [ ] Investigate alternative UI representations for the roamer.
- [ ] Determine how to display the roamer's status and IV glitch warning without the map.
- [ ] Provide recommendations for the fallback UI design.
