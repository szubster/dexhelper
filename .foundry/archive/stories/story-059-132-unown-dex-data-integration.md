---
id: story-059-132-unown-dex-data-integration
type: STORY
title: Unown Dex Panel Data Integration
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-28'
depends_on:
  - story-059-131-unown-dex-panel-ui
jules_session_id: null
pr_number: null
parent: epic-037-059-unown-tracker-ui
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

# Story: Unown Dex Panel Data Integration

## Objective
Integrate the newly built UI panel with the parsed `unownForm` data.

## Logic
Determine which of the 26 Unown forms (A-Z) the player possesses in their active party or PC boxes by aggregating the `unownForm` properties from the save file data instances. Surface the missing/owned states to the Unown Dex Panel UI component.

## Acceptance Criteria
- [x] Task for mapping the unownForm property to the Unown Dex Panel UI component created.

## Tasks
- [ ] .foundry/tasks/task-132-206-unown-dex-data-integration-impl.md
- [ ] .foundry/tasks/task-132-207-unown-dex-data-integration-qa.md
