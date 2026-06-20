---
id: epic-044-212-gen3-roamer-dashboard-ui-v2
type: EPIC
title: Gen 3 Roamer Dashboard UI V2
status: PENDING
owner_persona: story_owner
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - research-044-211-gen3-roamer-ui-alternatives
  - epic-044-070-gen3-roamer-core-extraction
  - epic-044-071-gen3-roamer-iv-glitch
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

# Gen 3 Roamer Dashboard UI V2

## Objective
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state, omitting map-based tracking.

## Description
Develop a dashboard view that presents the exact state of the roaming Pokémon, utilizing the parsed data. It should clearly display the Pokémon's Nature, individual IVs, current HP, status condition, and provide a prominent warning if the IV Glitch has corrupted its stats. This replaces the previous UI Epic that incorrectly included Route Radar integration, as extracting the exact map location is impossible.

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure the design reflects the findings from `research-044-211-gen3-roamer-ui-alternatives` and does not include map locations.
- [ ] Story Owner: Break down this Epic into executable Stories.