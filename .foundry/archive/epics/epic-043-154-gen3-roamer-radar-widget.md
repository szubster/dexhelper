---
id: epic-043-154-gen3-roamer-radar-widget
type: EPIC
title: Gen 3 Roamer Radar Widget
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-10'
updated_at: '2026-07-10'
depends_on:
  - epic-043-153-gen3-roamer-map-translation
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 1
rejection_reason: 'Permanently CANCELLED as Gen 3 roamer map coordinates are stored in EWRAM and are not serialized to the save file, making static extraction impossible as per research-043-263-roamer-tracking-remediation and ADR 108-027.'
notes: ''
---

# Gen 3 Roamer Radar Widget

## Objective
Build a visible dashboard widget that lists all active roaming Pokémon in the Gen 3 save file, displaying their current location and status tags.

## Description
- **Roamer Radar Widget**: Construct a UI component that displays a list of active Gen 3 roamers.
- **Live Location**: The widget should show the human-readable route name where the roamer is currently located, obtained from the Translation Layer.
- **Status Tags**: Add visual tags to indicate the roamer's status (e.g., "Active", "Caught", "Defeated").

## Acceptance Criteria
- [ ] A dedicated UI component displays the list of any active Gen 3 roamers.
- [ ] The component shows the human-readable route location for each roamer.
- [ ] Status tags ("Active", "Caught", "Defeated") are correctly displayed based on save data.
- [ ] Story Owner: Break down this Epic into executable Stories.

### Task Cancellation
This Epic is permanently CANCELLED as Gen 3 roamer map coordinates are stored in EWRAM and are not serialized to the save file, making static extraction impossible as per `research-043-263-roamer-tracking-remediation` and ADR 108-027.
