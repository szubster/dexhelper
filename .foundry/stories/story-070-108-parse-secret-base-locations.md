---
id: story-070-108-parse-secret-base-locations
type: STORY
title: Parse Gen 3 Secret Base Locations
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-26'
depends_on: []
jules_session_id: '5620502763609717069'
pr_number: null
parent: epic-045-070-gen3-secret-base-parsing
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# STORY: Parse Gen 3 Secret Base Locations

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This involves finding where the Secret Bases are built and who owns them.

## Objectives
- Use the `DataView` API (per ADR 010) to parse the Gen 3 save file and identify all active Secret Base locations.
- Map the internal location IDs to the unified Gen 3 map graph.

## Acceptance Criteria
- [x] Break down into Tasks.

- [x] task-108-163-gen3-secret-base-parser
- [x] task-108-164-gen3-secret-base-parser-qa

- [ ] research-108-221-gen3-secret-base-rangeerror
- [ ] task-108-222-gen3-secret-base-parser-retry-impl
- [ ] task-108-223-gen3-secret-base-parser-retry-qa
