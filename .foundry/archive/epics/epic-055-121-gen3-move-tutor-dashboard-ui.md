---
id: epic-055-121-gen3-move-tutor-dashboard-ui
type: EPIC
title: Gen 3 Move Tutor Dashboard UI
status: CANCELLED
owner_persona: story_owner
created_at: 2026-06-30T00:00:00.000Z
updated_at: '2026-07-30'
depends_on:
  - epic-055-120-gen3-move-tutor-compatibility
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - gen3
  - ui
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-055-119-gen3-move-tutor-save-parsing
notes: ''
---

# Epic: Gen 3 Move Tutor Dashboard UI

## Objective
Create the user interface for the Move Tutor Tracking Dashboard, displaying available tutors and compatible Pokémon in a tactical, scannable format.

## Scope
- Implement a dedicated view/route for the Move Tutor Tracker.
- Display a comprehensive list of all one-time Move Tutors for the loaded Gen 3 save file.
- Visually differentiate between "Available" and "Used" tutors based on parsed save data.
- For available tutors, render a visual list or grid of compatible Pokémon currently in the player's Party or PC boxes (utilizing data from `epic-055-120`).
- Ensure the design strictly adheres to the 'tactical hardware/snooping' aesthetic (sharp edges `rounded-none`, dashed borders, monospace fonts) as mandated by ADR 008.

## Prerequisites
- The underlying save parsing (`epic-055-119`) and compatibility cross-referencing (`epic-055-120`) logic must be complete and providing data to the UI layer.

## Acceptance Criteria
- [ ] A dedicated dashboard view is created for Move Tutors.
- [ ] Tutors are clearly listed and their status (Available/Used) is visually distinct.
- [ ] Compatible Pokémon are displayed prominently alongside available tutors.
- [ ] The entire interface conforms to the tactical hardware aesthetic guidelines (ADR 008).
- [ ] The UI remains responsive when rendering the list of compatible Pokémon, even with many matches.
