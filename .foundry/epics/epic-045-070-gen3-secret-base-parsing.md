---
id: epic-045-070-gen3-secret-base-parsing
type: EPIC
title: Gen 3 Secret Base Save File Parsing
status: PENDING
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-073-045-gen3-secret-base-viewer
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

# EPIC: Gen 3 Secret Base Save File Parsing

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to parse the save file to identify all active Secret Bases and extract NPC trainer data from mixed records. This data includes the friend's trainer name, team composition, and EV yields, as well as whether the player has battled them today.

## Objectives
- Implement save parsing logic using `DataView` (per ADR 010) for Gen 3 Secret Base locations.
- Extract mixed record data, including NPC trainer names, teams, and EV yields.
- Track daily rematch status for these NPC trainers.

## Acceptance Criteria
- [ ] Story Owner: Break this Epic down into actionable Stories.
