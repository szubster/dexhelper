---
id: epic-113-325-safari-zone-dashboard-ui
type: EPIC
title: Safari Zone Tracking Dashboard UI
status: READY
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-09-01'
depends_on:
  - epic-113-324-safari-zone-data-integration
jules_session_id: null
pr_number: null
parent: prd-111-113-safari-zone-tracker
tags:
  - frontend
  - ui
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Tracking Dashboard UI

## Overview
This Epic focuses on building the frontend components for the Safari Zone Tracking Dashboard, leveraging the tactical UI primitives defined in ADR 024. The dashboard will allow users to select target Pokémon, see which Safari Zone area they spawn in, and view a "bounty board" of missing encounters.

## Technical Scope
- Create a new Safari Zone route and container component.
- Implement a visual representation (map or area cards) of the Safari Zone that highlights based on target selection.
- Implement a dropdown/search for valid Safari encounters for the user's game version.
- Implement the "bounty board" side panel showing uncaught rare encounters.
- Apply tactical UI CSS utilities for styling.

## Acceptance Criteria
- [x] Create STORY nodes for the main layout and route integration.
- [ ] story-325-526-safari-zone-layout-and-route
- [x] Create STORY nodes for the Area Highlighting and Target Selection components.
- [ ] story-325-527-safari-zone-area-highlighting
- [x] Create STORY nodes for the Bounty Board panel.
- [ ] story-325-528-safari-zone-bounty-board
- [ ] story-325-529-safari-zone-dashboard-e2e
