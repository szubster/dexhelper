---
id: research-044-207-investigate-roamer-location-failure
type: RESEARCH
title: Investigate Gen 3 Roamer Location Radar Failure
status: PENDING
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Radar Failure

## Objective
Investigate the root cause of the roamer location radar failure (`epic-044-072-gen3-roamer-location-radar`), specifically focusing on why extracting map locations from Gen 3 save files is impossible.

## Description
The implementation Epic for the Roamer Location Radar has failed permanently. This RESEARCH node is spawned to formally investigate the root cause, documenting the technical impossibility so that replacement nodes (like the UI dashboard without the radar component) can proceed confidently without attempting this feature.

## Acceptance Criteria
- [ ] Read and summarize the architectural decision regarding the impossibility of Gen 3 roamer location extraction (`adr-108-027-gen3-roamer-location-impossible.md`).
- [ ] Confirm the behavior of EWRAM versus serialized save data for the Roamer's active map coordinates.
