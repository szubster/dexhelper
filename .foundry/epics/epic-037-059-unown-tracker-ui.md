---
id: epic-037-059-unown-tracker-ui
type: EPIC
title: Unown Form Tracker UI Updates
status: PENDING
owner_persona: story_owner
created_at: '2026-06-04'
updated_at: '2026-06-14'
depends_on:
  - epic-037-058-unown-tracker-engine
jules_session_id: null
pr_number: null
parent: prd-068-037-unown-tracker
tags:
  - feature
  - gen2
  - tracking
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Unown Form Tracker UI Updates

## Objective
Surface the parsed Unown forms in the user interface to provide a checklist.

## Logic
Add a dedicated "Unown Dex" panel or filter within the existing Storage Viewer.

## Display
It should visually represent which of the 26 Gen 2 forms are currently owned by the player (in Party or PC) and which are missing.

## Design Constraints
Must adhere strictly to the "tactical hardware/snooping" aesthetic (`rounded-none`, dashed borders, monospace fonts) as defined in ADR 008.

## Acceptance Criteria
- [x] Story for Unown Dex panel UI created.
- [x] Story for Unown Dex panel data integration created.

## Generated Stories
- [ ] `story-059-131-unown-dex-panel-ui`
- [ ] `story-059-132-unown-dex-data-integration`
