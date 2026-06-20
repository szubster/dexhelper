---
id: epic-044-097-gen3-roamer-dashboard-ui-v2
type: EPIC
title: Gen 3 Roamer Dashboard UI V2
status: PENDING
owner_persona: story_owner
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - epic-044-070-gen3-roamer-core-extraction
  - epic-044-071-gen3-roamer-iv-glitch
  - research-044-210-investigate-location-radar-failure
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
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state, adjusting for the lack of explicit map coordinates.

## Description
Develop a dashboard view that presents the exact state of the roaming Pokémon, utilizing the parsed data. It should clearly display the Pokémon's Nature, individual IVs, current HP, and status condition. It should provide a prominent warning if the IV Glitch has corrupted its stats. Since precise map locations cannot be extracted (as per `adr-108-027`), the UI must rely on the research from `research-044-210` to determine the best alternative visual representation (e.g. tracking "Active" status flags instead of map routes).

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Implement alternative tracking indicators based on the findings from `research-044-210`.
- [ ] Story Owner: Break down this Epic into executable Stories.