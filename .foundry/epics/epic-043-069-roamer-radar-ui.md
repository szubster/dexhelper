---
id: epic-043-069-roamer-radar-ui
type: EPIC
title: Roamer Radar UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on:
  - epic-043-068-roamer-map-translation
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Roamer Radar UI

## Objective
Build a visible dashboard or map widget that lists all active roaming Pokémon in the save file, displaying their current location, status tags, and highlighting their current route on an interactive map.

## Description
- **Roamer Radar Widget**: Construct a UI component that displays a list of active roamers.
- **Live Location**: The widget should show the human-readable route name where the roamer is currently located, obtained from the Translation Layer.
- **Status Tags**: Add visual tags to indicate the roamer's status (e.g., "Active", "Caught", "Defeated").
- **Map Integration**: Highlight the active roamer's current route on the interactive `.foundry/docs/adrs/010-gen3-map-graph-design.md` style map.
- Ensure the UI component integrates properly with the broader DexHelper application flow.

## Acceptance Criteria
- [ ] A dedicated UI component displays the list of any active roamers.
- [ ] The component shows the human-readable route location for each roamer.
- [ ] Status tags ("Active", "Caught", "Defeated") are correctly displayed based on save data.
- [ ] The roamer's current route is highlighted on the map.
- [ ] Story Owner: Break down this Epic into executable Stories.
