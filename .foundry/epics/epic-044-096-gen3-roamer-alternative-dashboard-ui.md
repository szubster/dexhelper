---
id: epic-044-096-gen3-roamer-alternative-dashboard-ui
type: EPIC
title: Gen 3 Roamer Alternative Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - research-044-207-gen3-roamer-alternative-ui
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

# Gen 3 Roamer Alternative Dashboard UI

## Objective
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state, focusing on stats rather than map location.

## Description
This Epic replaces `epic-044-073-gen3-roamer-dashboard-ui`. Due to the impossibility of extracting map location data (as documented in `adr-108-027-gen3-roamer-location-impossible`), the dashboard must pivot. Develop a dashboard view that presents the exact state of the roaming Pokémon based on the alternative UI approach proposed in `research-044-207-gen3-roamer-alternative-ui`. It should clearly display the Pokémon's Nature, individual IVs, current HP, status condition, and provide a prominent warning if the IV Glitch has corrupted its stats.

## Acceptance Criteria
- [ ] Implement the alternative UI design proposed in `research-044-207-gen3-roamer-alternative-ui`.
- [ ] Build a UI component to clearly display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure the UI provides a complete and useful experience without map integration.
- [ ] Story Owner: Break down this Epic into executable Stories.
