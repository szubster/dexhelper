---
id: epic-045-324-gen3-secret-base-parsing-v2
type: EPIC
title: Gen 3 Secret Base Save File Parsing (v2)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-03'
depends_on:
  - research-045-321-investigate-secret-base-failure
jules_session_id: '1760903015226025615'
pr_number: null
parent: prd-073-045-gen3-secret-base-viewer
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# EPIC: Gen 3 Secret Base Save File Parsing (v2)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to parse the save file to identify all active Secret Bases and extract NPC trainer data from mixed records. This is the v2 attempt after the previous epic failed.

## Objectives
- Implement save parsing logic using `DataView` (per ADR 010) for Gen 3 Secret Base locations.
- Extract mixed record data, including NPC trainer names, teams, and EV yields.
- Track daily rematch status for these NPC trainers.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into actionable Stories.
- [x] story-324-333-parse-secret-base-locations
- [x] story-324-334-extract-mixed-record-trainer-data
- [x] story-324-335-track-daily-rematch-status
