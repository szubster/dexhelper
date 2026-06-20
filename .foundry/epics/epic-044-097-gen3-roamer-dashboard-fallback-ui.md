---
id: epic-044-097-gen3-roamer-dashboard-fallback-ui
type: EPIC
title: Gen 3 Roamer Dashboard Fallback UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - epic-044-096-gen3-roamer-radar-fallback-ui
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

# Gen 3 Roamer Dashboard Fallback UI

## Objective
Create the dashboard view that presents the comprehensive breakdown of the roaming legendary's internal state using the fallback radar representation.

## Description
This Epic replaces `epic-044-073-gen3-roamer-dashboard-ui`. It will display the parsed data (Nature, IVs, HP, Status, and IV Glitch warning) and correctly integrate with the fallback radar UI implemented in `epic-044-096-gen3-roamer-radar-fallback-ui`.

## Acceptance Criteria
- [ ] Build a UI component to display the roamer's Nature, IVs, HP, and Status.
- [ ] Implement a visual warning indicator for the IV Glitch.
- [ ] Ensure seamless integration with the fallback Route Radar UI component.
- [ ] Story Owner: Break down this Epic into executable Stories.
