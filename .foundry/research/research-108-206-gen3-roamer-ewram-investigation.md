---
id: research-108-206-gen3-roamer-ewram-investigation
type: RESEARCH
title: Investigate Gen 3 Roamer Location Extration Failure
status: PENDING
owner_persona: researcher
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-072-108-gen3-roamer-location-extraction
tags:
  - gen3
  - roamer
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Extraction Failure

## Objective
Determine the root cause of the permanent failure (impossible loop) in `task-108-161-gen3-roamer-location-impl`.

## Description
The coder implementation task failed permanently with the rejection reason: "Roamer locations are stored in EWRAM and are not serialized into the .sav file, making extraction impossible."
This RESEARCH node investigates the claim to confirm whether the exact map location (map group and map number) is indeed not saved to the Gen 3 game save file, and suggests an alternative approach for the Route Radar integration.

## Acceptance Criteria
- [ ] Investigate the save structure for Gen 3 roamers.
- [ ] Confirm whether roamer location is strictly an EWRAM variable.
- [ ] Propose an alternative strategy for handling the roamer in the Route Radar UI.
