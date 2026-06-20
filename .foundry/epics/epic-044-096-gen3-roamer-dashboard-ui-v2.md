---
id: epic-044-096-gen3-roamer-dashboard-ui-v2
type: EPIC
title: Gen 3 Roamer Dashboard UI (Without Radar)
status: PENDING
owner_persona: story_owner
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - epic-044-070-gen3-roamer-core-extraction
  - epic-044-071-gen3-roamer-iv-glitch
  - research-044-207-investigate-roamer-location-failure
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

# Gen 3 Roamer Dashboard UI (Without Radar)

## Objective
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state, excluding the location radar.

## Description
Develop a dashboard view that presents the exact state of the roaming Pokémon, utilizing the parsed data. It should clearly display the Pokémon's Nature, individual IVs, current HP, and status condition, and provide a prominent warning if the IV Glitch has corrupted its stats. This node replaces the originally planned dashboard (`epic-044-073-gen3-roamer-dashboard-ui`) which incorrectly depended on the permanently failed location radar epic.

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure the dashboard functions correctly without location data, acting on the findings from the research node.
- [ ] Story Owner: Break down this Epic into executable Stories.
