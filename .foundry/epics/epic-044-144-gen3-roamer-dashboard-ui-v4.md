---
id: epic-044-144-gen3-roamer-dashboard-ui-v4
type: EPIC
title: Gen 3 Roamer Dashboard UI v4
status: PENDING
owner_persona: story_owner
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on:
  - epic-044-142-gen3-roamer-core-extraction-v3
  - epic-044-143-gen3-roamer-iv-glitch-v3
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Roamer Dashboard UI v4

## Objective
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state without relying on Route Radar.

## Description
Develop a dashboard view that presents the exact state of the roaming Pokémon, utilizing the parsed data. It should clearly display the Pokémon's Nature, individual IVs, current HP, status condition, and provide a prominent warning if the IV Glitch has corrupted its stats. This version drops the impossible integration with the Route Radar.

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure the UI adheres to the alternative design determined by the research phase.
- [ ] Story Owner: Break down this Epic into executable Stories.
