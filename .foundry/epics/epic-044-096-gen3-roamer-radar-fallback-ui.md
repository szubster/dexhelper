---
id: epic-044-096-gen3-roamer-radar-fallback-ui
type: EPIC
title: Gen 3 Roamer Radar Fallback UI
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

# Gen 3 Roamer Radar Fallback UI

## Objective
Implement an alternative representation of the roaming legendary for the Route Radar or Dashboard, relying on research regarding what can be shown instead of exact location.

## Description
This Epic replaces `epic-044-072-gen3-roamer-location-radar` which was permanently cancelled. Since we cannot extract the exact map location (see ADR 108-027), this feature will implement the alternative UI approach recommended by `research-044-207-gen3-roamer-alternative-ui`, such as an educational overlay explaining the limitation or a focus on active tracking status instead of mapping.

## Acceptance Criteria
- [ ] Implement the alternative roamer UI design.
- [ ] Ensure the UI gracefully handles the absence of map coordinate data.
- [ ] Story Owner: Break down this Epic into executable Stories.
