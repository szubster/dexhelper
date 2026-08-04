---
id: epic-044-399-gen3-roamer-dashboard-ui-v7
type: EPIC
title: Gen 3 Roamer Dashboard UI v7
status: FAILED
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on:
  - epic-044-398-gen3-roamer-iv-glitch-v5
  - epic-044-397-gen3-roamer-core-extraction-v5
  - research-044-396-gen3-roamer-tracker-failure
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ACTIVE node missing or malformed session ID
notes: Replacement for epic-044-151
---

# Gen 3 Roamer Dashboard UI v7

## Objective
Create a user interface to display the comprehensive breakdown of the roaming legendary's internal state (Note: Route Radar mapping is impossible per ADR 108-027, focusing solely on stat breakdown).

## Description
Develop a dashboard view that presents the exact state of the roaming Pokémon, utilizing the parsed data. It should clearly display the Pokémon's Nature, individual IVs, current HP, status condition, and provide a prominent warning if the IV Glitch has corrupted its stats. This fulfills the PRD by providing an exact breakdown of internal state; location extraction via Route Radar has been proven impossible (ADR 108-027).

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure the UI adheres to the alternative design determined by the research phase.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification to ensure proper system-wide rendering.
- [ ] Story Owner: Break down this Epic into executable Stories.
