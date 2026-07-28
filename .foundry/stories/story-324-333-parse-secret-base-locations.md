---
id: story-324-333-parse-secret-base-locations
type: STORY
title: Parse Gen 3 Secret Base Locations (v2)
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: '17846287558025326046'
pr_number: null
parent: epic-045-324-gen3-secret-base-parsing-v2
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Parse Gen 3 Secret Base Locations (v2)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This involves finding where the Secret Bases are built and who owns them.

## Objectives
- Use the `DataView` API (per ADR 010) to parse the Gen 3 save file and identify all active Secret Base locations.
- Map the internal location IDs to the unified Gen 3 map graph.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [x] task-333-334-gen3-secret-base-locations-impl
- [x] task-333-335-gen3-secret-base-locations-qa
- [ ] research-333-348-investigate-secret-base-offsets
- [ ] task-333-349-gen3-secret-base-locations-retry-impl
- [ ] task-333-350-gen3-secret-base-locations-retry-qa
